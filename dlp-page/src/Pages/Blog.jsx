import React, { useEffect, useState } from 'react';
import SecondHero from '../components/SecondHero';
import { Card, Badge, Spinner, Button } from 'flowbite-react';
import { Link, useParams } from 'react-router-dom';
import CallToAction from '../components/CallToAction';

const Blog = () => {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);
  const [post, setPost] = useState([]);
  const [showMore, setShowMore] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/post/getposts');
        const data = await res.json();

        if (!res.ok) {
          setErr(true);
          return;
        }

        setPost(data.posts);
      } catch (err) {
        console.log(err.message);
        setErr(true);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, []);

  const handleShowMore = async () => {
    const startIndex = post.length;
    try {
      const res = await fetch(`/api/post/getposts?startIndex=${startIndex}`);
      if (!res.ok) return;

      const data = await res.json();
      if (data.posts) {
        setPost((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.error('Error in handleShowMore:', error);
    }
  };

  return (
    <main>
      {/* Hero Section */}
      <SecondHero />

      {/* Title */}
      <section className="mt-28 text-center">
        <h1 className="text-4xl font-bold font-sans">
          Delsu Codel News & Updates
        </h1>
        <p className="text-gray-600 mt-2">
          Stay updated with the latest news, articles, and stories.
        </p>
      </section>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center h-40">
          <Spinner size="xl" color="info" />
        </div>
      )}

      {/* Error State */}
      {err && (
        <div className="text-center text-red-600 mt-10">
          Failed to load posts. Please try again later.
        </div>
      )}

      {/* Posts Grid */}
      <section className="max-w-7xl mx-auto px-5 sm:px-10 mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {post.map((data, index) => (
          <Link
            key={index}
            to={`/post/${data.slug}`}
            className="hover:scale-[1.02] transition-transform"
          >
            <Card
              className="h-full flex flex-col justify-between"
              imgSrc={data.image}
              imgAlt={data.title}
            >
              <div className="flex justify-between items-center mb-2">
                <Badge color="info" size="sm">
                  {data.category}
                </Badge>
                <span className="text-xs text-gray-500">
                  {new Date(data.createdAt).toLocaleDateString()}
                </span>
              </div>

              <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-2">
                {data.title}
              </h5>

              <div
                className="font-normal text-gray-700 text-sm line-clamp-3 dark:text-gray-400"
                dangerouslySetInnerHTML={{ __html: data.content }}
              />
            </Card>
          </Link>
        ))}
      </section>

      {/* Show More Button */}
      {showMore && !loading && post.length > 0 && (
        <div className="flex justify-center mt-10">
          <Button
            color="info"
            onClick={handleShowMore}
            className="px-6 py-2 font-semibold"
          >
            Show More
          </Button>
        </div>
      )}

      {/* Call to Action */}
      <div className="mt-16">
        <CallToAction />
      </div>
    </main>
  );
};

export default Blog;
