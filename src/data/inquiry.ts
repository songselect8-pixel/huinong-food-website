import { brand, categories, products } from "./site";
import { readApplicationRequest } from "./applications";
import { certifications, documentTypes, readDocumentationRequest } from "./quality";

export const inquiryTypes = [
  { id: "product", name: "Product Inquiry" },
  { id: "sample", name: "Sample Discussion" },
  { id: "private-label", name: "Private Label Project" },
  { id: "quality", name: "Quality Documents" },
] as const;
export const emptyBrief = {
  kind: "product" as "product" | "sample" | "private-label" | "quality",
  productId: "", categoryId: "", form: "", application: "", packaging: "",
  quantity: "", unit: "", timeline: "", targetMarket: "", documents: [] as string[],
  certificateId: "", documentNote: "", source: "", articleTitle: "", coldChain: "", leafFormat: "", projectNotes: "", sampleFocus: "",
};
export type InquiryBrief = typeof emptyBrief;
export const emptyInquiry = { ...emptyBrief, name: "", email: "", company: "", region: "", message: "" };
export type InquiryFields = typeof emptyInquiry;

// Only recognized identifiers enter URL prefills. Personal fields are never read from a URL.
export function readInquiryRequest(search: URLSearchParams): InquiryBrief | null {
  const source = search.get("source");
  const application = readApplicationRequest(search);
  if (source === "application") {
    if (!application) return { ...emptyBrief };
    const product = products.find(item => item.id === application.productId);
    return { ...emptyBrief, productId: product?.id ?? "", categoryId: product?.categoryId ?? "", application: application.application.name, packaging: application.packaging, documentNote: application.documents, source: application.source };
  }
  const product = products.find(item => item.id === search.get("product"));
  const category = categories.find(item => item.id === search.get("category"));
  if (source === "quality") {
    const request = readDocumentationRequest(search);
    return { ...emptyBrief, kind: "quality", source: "/quality", productId: product?.id ?? "", categoryId: product?.categoryId ?? "", documents: request?.types.map(item => item.id) ?? [], targetMarket: request?.market ?? "", certificateId: certifications.find(item => item.name === request?.certificate)?.id ?? "" };
  }
  if (source === "private-label") return { ...emptyBrief, kind: "private-label", source: "/private-label", categoryId: category?.id ?? "" };
  if (source === "about") return { ...emptyBrief, source: "/about" };
  if (source === "resources") return { ...emptyBrief, source: "/resources" };
  if (product) return { ...emptyBrief, productId: product.id, categoryId: product.categoryId, form: product.detail?.forms.find(item => item.name === search.get("form"))?.name ?? "", source: `/products/${product.id}` };
  if (category) return { ...emptyBrief, categoryId: category.id, source: "/products" };
  return search.has("product") || search.has("category") || source ? { ...emptyBrief } : null;
}

export function briefRows(fields: InquiryFields): { key: keyof InquiryBrief; label: string; value: string }[] {
  const product = products.find(item => item.id === fields.productId);
  return [
    {key: "productId", label: "Product", value: product?.name ?? ""},
    {key: "categoryId", label: "Product direction", value: categories.find(item => item.id === fields.categoryId)?.name ?? ""},
    {key: "form", label: "Form / selection", value: fields.form},
    {key: "application", label: "Application", value: fields.application},
    {key: "packaging", label: "Packaging", value: fields.packaging},
    {key: "quantity", label: "Quantity", value: [fields.quantity, fields.unit].filter(Boolean).join(" ")},
    {key: "timeline", label: "Project timing", value: fields.timeline},
    {key: "targetMarket", label: "Target market", value: fields.targetMarket},
    {key: "documents", label: "Request", value: documentTypes.filter(item => fields.documents.includes(item.id)).map(item => item.name).join("; ")},
    {key: "certificateId", label: "Certification topic", value: certifications.find(item => item.id === fields.certificateId)?.name ?? ""},
    {key: "documentNote", label: "Document requirements", value: fields.documentNote},
    {key: "coldChain", label: "Cold-chain requirements", value: fields.coldChain},
    {key: "leafFormat", label: "Leaf format", value: fields.leafFormat},
    {key: "projectNotes", label: "Project requirements", value: fields.projectNotes},
    {key: "sampleFocus", label: "Sample evaluation", value: fields.sampleFocus},
    {key: "source", label: "Source page", value: fields.source},
    {key: "articleTitle", label: "Buying guide", value: fields.articleTitle},
  ].filter(row => row.value) as { key: keyof InquiryBrief; label: string; value: string }[];
}

// Plain text generated only on the buyer's explicit copy/download action; never transmitted.
export function inquiryText(fields: InquiryFields): string {
  const rows = [
    {label:"Name",value:fields.name}, {label:"Email",value:fields.email},
    {label:"Company",value:fields.company}, {label:"Country / Region",value:fields.region},
    ...briefRows(fields), {label:"Message",value:fields.message},
  ];
  return [`${brand.name} — ${inquiryTypes.find(type => type.id === fields.kind)?.name ?? "Inquiry"}`, "Local draft — not sent", "", ...rows.filter(row => row.value).map(row => `${row.label}: ${row.value}`)].join("\n\n");
}
