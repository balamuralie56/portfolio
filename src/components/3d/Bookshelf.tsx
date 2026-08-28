'use client';

import React, { useMemo } from 'react';
import { useModel } from './hooks';

// Real assets — see public/ASSET_LICENSES.md. The shelf is one download;
// books are the same downloaded model reused (cloned) at several positions
// and slight rotation variation, rather than downloading one asset per book.
export default function Bookshelf() {
  const shelf = useModel('/models/furniture/bookshelf/Shelf_01_1k.gltf');
  const bookPositions = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => ({
        x: -0.36 + i * 0.115,
        rotY: ((i * 53) % 10) / 100 - 0.05,
      })),
    []
  );

  return (
    <group>
      <primitive object={shelf} />
      {bookPositions.map((b, i) => (
        <BookInstance key={i} x={b.x} rotY={b.rotY} />
      ))}
    </group>
  );
}

function BookInstance({ x, rotY }: { x: number; rotY: number }) {
  const scene = useModel('/models/decor/books/book_encyclopedia_set_01_1k.gltf');
  return <primitive object={scene} position={[x, 1.02, 0.03]} rotation={[0, rotY, 0]} />;
}
