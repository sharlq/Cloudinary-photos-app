import React from 'react';
import UploadButton from './upload-button';
import cloudinary from 'cloudinary';
import CloudinaryImage from './CloudinaryImage';

export type SearchResult = {
  public_id: string;
  tags: string[];
};

const GalleryPage = async () => {
  const results = (await cloudinary.v2.search
    .expression('resource_type:image')
    .sort_by('created_at', 'desc')
    .max_results(1)
    .with_field('tags')
    .execute()) as { resources: SearchResult[] };

  console.log('results', results);

  return (
    <section className="flex flex-col justify-between gap-8 mt-4">
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold">Gallery</h1>
        <UploadButton />
      </div>
      <div className="grid grid-cols-4 gap-4">
        {results.resources.map((result) => (
          <CloudinaryImage
            {...result}
            key={result.public_id}
            publicId={result.public_id}
            width="400"
            height="300"
            alt="an image"
          />
        ))}
      </div>
    </section>
  );
};

export default GalleryPage;
