import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner } from 'flowbite-react';

const PostPage = () => {
//   const { postSlug } = useParams();
//   const [loading, setLoading] = useState(false);
//   const [err, setErr] = useState(false);
//   const [post, setPost] = useState(null);

//   useEffect(() => {
//     const fetchPost = async () => {
//       try {
//         setLoading(true);
//         const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
//         const data = await res.json();

//         if (!res.ok) {
//           setErr(true);
//           setLoading(false);
//           return;
//         }

//         setPost(data.posts); // Assuming data.posts is correct
//         setLoading(false);
//         setErr(false);
//       } catch (error) {
//         console.log(error.message);
//         setErr(true);
//         setLoading(false);
//       }
//     };

//     fetchPost();
//   }, [postSlug]);

//   if (loading)
//     return (
//       <div className='flex items-center justify-center min-h-screen'>
//         <Spinner size='xl' />
//       </div>
//     );

//   if (err || !post)
//     return (
//       <div className='flex items-center justify-center min-h-screen text-red-600'>
//         Something went wrong.
//       </div>
//     );

//   return (
//     <main className='flex flex-col items-center justify-center px-4 py-8'>
//       <h1 className='text-2xl font-bold mb-4'>{post.title || 'Post Title'}</h1>
//       <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
//     </main>
//   );
// };









// Dummy "Database"
const blogPosts = [
  {
    _id: "1",
    title: "Breaking News: Technology Shapes the Future",
    slug: "tech-future-2025",
    category: "news",
    content:
      "<p>Technology is advancing faster than ever before, with AI, quantum computing, and renewable energy leading the charge. Experts predict that the next decade will bring groundbreaking innovations that will transform everyday life.</p><p>From healthcare to space exploration, the possibilities are endless.</p>",
    createdAt: "2025-08-04T13:14:54.014Z",
    updatedAt: "2025-08-06T01:21:38.998Z",
    image:
      "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=1200&h=800&fit=crop",
    userId: "user123",
  },
  {
    _id: "2",
    title: "Local Community Launches Eco-Friendly Project",
    slug: "eco-project-2025",
    category: "news",
    content:
      "<p>A new initiative aims to reduce waste and promote sustainability in local neighborhoods. Volunteers are planting trees, organizing recycling drives, and educating citizens about green living.</p>",
    createdAt: "2025-08-01T10:20:30.014Z",
    updatedAt: "2025-08-02T01:21:38.998Z",
    image:
      "https://images.unsplash.com/photo-1523978591478-c753949ff840?w=1200&h=800&fit=crop",
    userId: "user456",
  },
  {
    _id: "3",
    title: "Sports Update: National Team Wins Championship",
    slug: "sports-championship",
    category: "sports",
    content:
      "<p>The national football team clinched the championship title in a nail-biting final match, with a last-minute goal sealing the victory.</p>",
    createdAt: "2025-08-03T15:14:54.014Z",
    updatedAt: "2025-08-04T11:21:38.998Z",
    image:
      "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=1200&h=800&fit=crop",
    userId: "user789",
  },
];


  const post = blogPosts[0]; // For now, show first post as example

  const relatedPosts = blogPosts.filter((p) => p._id !== post._id);

  return (
    <main className="bg-gray-50 min-h-screen font-sans">
      {/* Hero Section */}
      <header className="relative w-full h-[450px] overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center px-5">
          <span className="text-sm uppercase text-yellow-400 font-semibold">
            {post.category}
          </span>
          <h1 className="text-white text-4xl md:text-5xl font-bold leading-tight max-w-4xl">
            {post.title}
          </h1>
          <p className="text-gray-200 mt-3 text-lg">
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </div>
      </header>

      {/* Article Content */}
      <section className="max-w-4xl mx-auto px-5 py-10">
        <article className="prose prose-lg prose-gray max-w-none">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
      </section>

      {/* Related Posts */}
      <section className="max-w-6xl mx-auto px-5 pb-10">
        <h2 className="text-2xl font-bold mb-5">Related Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedPosts.map((relatedPost) => (
            <div
              key={relatedPost._id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
            >
              <img
                src={relatedPost.image}
                alt={relatedPost.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <span className="text-xs uppercase text-indigo-600 font-semibold">
                  {relatedPost.category}
                </span>
                <h3 className="text-lg font-semibold mt-2">
                  {relatedPost.title}
                </h3>
                <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                  {relatedPost.content.replace(/<[^>]+>/g, "")}
                </p>
                <a
                  href={`/blog/${relatedPost.slug}`}
                  className="inline-block mt-3 text-indigo-600 font-medium hover:underline"
                >
                  Read more →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};


export default PostPage;
