export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center px-8 text-center">
      <div className="work-affine-matrix-1 mb-8 mr-4 text-[120px] font-bold leading-none">
        404
      </div>

      <h1 className="mb-6 text-2xl">
        Page Not Found
      </h1>

      <p className="mb-12 text-neutral-700">
        お探しのページは存在しないか、移動または削除された可能性があります。
      </p>
    </div>
  );
}