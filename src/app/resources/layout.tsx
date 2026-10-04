import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./resources.css";
export default function ResourcesLayout({children}: {children:React.ReactNode}) {return <><SiteHeader/><main id="main" className="resources-page">{children}</main><SiteFooter/></>;}
