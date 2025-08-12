import React, { useState, useEffect } from "react";
import { Button, TextInput, Label, Alert, Select } from "flowbite-react";

const SECTIONS = [
  "about",
  "homepage",
  "howtoappyone",
  "howtoappytwo",
  "howtoappyThree",
  "programmes",
  "blog",
  "calltoaction",
];

const SECTION_FIELDS = {
  about: [
    "title", "subtitle", "intro", "mission", "vision", "philosophy", "vcMessage", "directorMessage",
  ],
  homepage: ["title", "subtitle", "intro"],
  howtoappyone: ["title", "subtitle"],
  howtoappytwo: ["title", "subtitle"],
  howtoappyThree: ["title", "subtitle"],
  programmes: ["title", "subtitle", "introtitle", "introsubtitle"],
  blog: ["title", "subtitle"],
  calltoaction: ["title", "subtitle"],
};

export default function SiteSettingsAdmin() {
  const [selectedSection, setSelectedSection] = useState("about");
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    setSuccess("");
    fetch(`/api/settings/${selectedSection}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch section data");
        return res.json();
      })
      .then((data) => {
        setFormData(data);
      })
      .catch((err) => {
        setError(err.message);
        setFormData({});
      })
      .finally(() => setLoading(false));
  }, [selectedSection]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSave() {
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      const token = localStorage.getItem("token"); // Adjust auth source if needed

      const res = await fetch(`/api/settings/${selectedSection}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to save");
      }

      setSuccess("Section updated successfully!");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Site Settings Admin</h1>

      <div className="mb-6 max-w-xs">
        <Label htmlFor="section-select" className="mb-2">Select Section</Label>
        <Select
          id="section-select"
          value={selectedSection}
          onChange={(e) => setSelectedSection(e.target.value)}
        >
          {SECTIONS.map((section) => (
            <option key={section} value={section}>
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </option>
          ))}
        </Select>
      </div>

      {loading ? (
        <p>Loading section data...</p>
      ) : error ? (
        <Alert color="failure" onDismiss={() => setError("")}>
          {error}
        </Alert>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
          className="space-y-4"
        >
          {SECTION_FIELDS[selectedSection]?.map((field) => (
            <div key={field}>
              <Label htmlFor={field} className="mb-1 capitalize">
                {field}
              </Label>
              <TextInput
                id={field}
                name={field}
                value={formData[field] || ""}
                onChange={handleChange}
                required
              />
            </div>
          ))}

          {selectedSection === "about" && (
            <div>
              <Label className="mb-1">Images (URLs, comma separated)</Label>
              <TextInput
                name="images"
                value={formData.images ? formData.images.join(", ") : ""}
                onChange={(e) => {
                  const imgs = e.target.value.split(",").map((url) => url.trim());
                  setFormData((prev) => ({ ...prev, images: imgs }));
                }}
                placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg"
              />
            </div>
          )}

          <Button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </Button>
        </form>
      )}

      {success && (
        <Alert color="success" className="mt-4" onDismiss={() => setSuccess("")}>
          {success}
        </Alert>
      )}
    </div>
  );
}
