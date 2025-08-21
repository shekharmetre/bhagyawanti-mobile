'use client';

import { Button } from "@/components/ui/button";
import { useApiMutation } from "@/hooks/api/secureapi";

// import { useState, useEffect, useCallback } from 'react';
// import { useApiMutation } from '@/hooks/api/secureapi';

// // You can fix or adjust these lat/lng/radius values as per your needs or from props/context
// const LAT = 12.959744;
// const LNG = 77.6208384;
// const RADIUS = 1500;

// export default function Test() {
//   const [shops, setShops] = useState<any>(null);
//   const [error, setError] = useState<string | null>(null);

//   const { mutate, isPending ,data} = useApiMutation({
//     endpoint: "/geo/api/shops",
//     onSuccess: (data: any) => {
//       setShops(data);
//       setError(null);
//     },
//     onError: (err: any) => {
//         console.log(err,"soemtin werro")
//       setError(err?.message || "Something went wrong");
//       setShops(null);
//     }
//   });

//   // Fetch on mount
// useEffect(() => {
//   const formData = new FormData();
//   formData.append('lat', String(LAT));
//   formData.append('lng', String(LNG));
//   formData.append('radius', String(RADIUS));

//   mutate({lat:LAT,lng:LNG});
// }, [mutate]);

// const handleRefetch = useCallback(() => {
//   const formData = new FormData();
//   formData.append('lat', String(LAT));
//   formData.append('lng', String(LNG));
//   formData.append('radius', String(RADIUS));

//   mutate(formData);
// }, [mutate]);

//   return (
//     <div>
//       <button onClick={handleRefetch} disabled={isPending}>
//         {isPending ? "Loading..." : "Refetch Shops"}
//       </button>

//       {error && <p style={{ color: 'red' }}>Error: {error}</p>}

//       <h1>Shop Data:</h1>
//       {!shops && !error && !isPending && <p>No data yet.</p>}

//       {shops && (
//         <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
//           {JSON.stringify(shops, null, 2)}
//         </pre>
//       )}
//     </div>
//   );
// }
import React, { useRef, useState } from 'react';
import axios from 'axios';

const ImageUploadButton: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click(); // Open file dialog
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const formData = new FormData();
      formData.append('image', file);

      // Send POST request with multipart/form-data
      const response = await axios.post('https://5df1ac9a0194.ngrok-free.app/test/api/recognize-phone', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true, // if your backend requires cookies or sessions
      });

      console.log(response,"succefully sending image to the backdn")

      // if (response.data?.success) {
      //   setSuccessMessage('Image upload and recognition successful!');
      //   console.log('Server response:', response.data);
      // } else {
      //   setErrorMessage(response.data?.error || 'Recognition failed without error details.');
      // }
    } catch (error: any) {
      console.error('Upload error:', error);
      if (error.response?.data?.error) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage(error.message || 'An unexpected error occurred.');
      }
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleButtonClick}
        disabled={isUploading}
        style={{
          padding: '8px 16px',
          backgroundColor: isUploading ? '#888' : '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: isUploading ? 'not-allowed' : 'pointer',
        }}
      >
        {isUploading ? 'Uploading...' : 'Click to Upload'}
      </button>

      {/* Hidden file input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      {errorMessage && (
        <p style={{ color: 'red', marginTop: '10px' }}>
          Error: {errorMessage}
        </p>
      )}

      {successMessage && (
        <p style={{ color: 'green', marginTop: '10px' }}>
          {successMessage}
        </p>
      )}
    </div>
  );
};

export default ImageUploadButton;
