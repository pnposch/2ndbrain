import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [ Component.PageTitle(),
            Component.Flex({
                      components: [
                        {
                          Component: Component.Search(),
                          grow: true,
                        },
                        { Component: Component.Darkmode() },
                        { Component: Component.ReaderMode() },
                      ],
                    }),
            ],
  afterBody: [],
  footer: Component.Footer( ),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    // Component.PageTitle(),
    // Component.MobileOnly(Component.Spacer()),
    //
    // Component.Explorer(),
  ],
  right: [
    // Component.Graph(),
    // Component.DesktopOnly(Component.TableOfContents()),
     Component.Backlinks(),
     Component.Explorer(),
     Component.DesktopOnly(Component.TableOfContents()),
     Component.Graph(),
     ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  right: [
    Component.MobileOnly(Component.Spacer()),
    Component.Explorer(),
  ],
 left: [],
}
