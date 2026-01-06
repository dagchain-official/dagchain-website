import "@/public/admin/css/styles/create-webpage.css";

type Props = {
  params: { slug: string };
};

export default function ProductKnowledgeEditor({ params }: Props) {
  const isNew = params.slug === "new";

  return (
    <div className="editor-wrapper">
      <h1>{isNew ? "Create Product Knowledge" : "Edit Product Knowledge"}</h1>

      {' ⬇️ PASTE BODY CONTENT of create-product-knowledge.html here '}
    </div>
  );
}
