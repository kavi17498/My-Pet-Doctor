import React from 'react';
import Navbar from '../components/Navbar';
import blog1 from '../assets/blog1.png';
import blog2 from '../assets/blog2.png';
import blog3 from '../assets/blog3.png';

function Blog() {
  const blogPosts = [
    {
      id: 1,
      title: 'Grooming Anxiety in Dogs – Tips to Calm Your Anxious Dog',
      description:
        'Does your dog become anxious when it comes to grooming time? Here, you will find helpful tips to make a trip to the groomer a happy adventure.',
      image: blog1,
      link: '/blog/grooming-anxiety',  // Link to the Grooming Anxiety article
    },
    {
      id: 2,
      title: 'Purevax Rabies Vaccine for Cats',
      description:
        'Learn why Purevax Rabies Vaccine is essential for keeping your feline healthy and protected.',
      image: blog3,
      link: '/blog/purevax-vaccine',  // Link to the Purevax Vaccine article
    },
    {
      id: 3,
      title: 'Checklist for Your Pet’s First Vet Visit',
      description:
        'Prepare for your pet’s first vet visit with our detailed checklist to ensure a smooth and stress-free experience.',
      image: blog2,
      link: '/blog/first-vet-visit',  // Link to the First Vet Visit article
    },
  ];

  return (
    <>
      <Navbar />
      <hr className="border-t-4 border-gray-300 my-10" />
      <div className="container mx-auto px-4 my-10">
        {/* Blog Header */}
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Blog
        </h1>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="card bg-white shadow-md hover:shadow-lg transition duration-300 rounded-lg"
            >
              {/* Blog Image */}
              <figure>
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              </figure>

              {/* Blog Content */}
              <div className="card-body p-5">
                <h2 className="card-title text-xl font-semibold text-gray-800">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-600 mt-2">{post.description}</p>
                <div className="card-actions mt-4">
                  <a
                    href={post.link} // This links to the article based on the path provided
                    className="bg-rose-400 hover:bg-red-300 text-white px-4 py-2 rounded font-semibold text-sm transition duration-300"
                  >
                    Read More
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Blog;
