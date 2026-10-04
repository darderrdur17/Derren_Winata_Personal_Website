import { describe, it, expect } from "vitest";
import { projectsItemList, breadcrumbList } from "./structuredData";
import { projects } from "@/data/projects";

describe("projectsItemList", () => {
  it("builds an ItemList mirroring the projects data", () => {
    const list = projectsItemList();
    expect(list["@type"]).toBe("ItemList");
    expect(list.itemListElement).toHaveLength(projects.length);
    list.itemListElement.forEach((item, i) => {
      expect(item.position).toBe(i + 1);
      expect(item.name).toBe(projects[i].title);
      expect(item.url).toBe(projects[i].href);
    });
  });

  it("starts with the first curated project", () => {
    const list = projectsItemList();
    expect(list.itemListElement[0].name).toBe("360 Cogni");
  });
});

describe("breadcrumbList", () => {
  it("returns null for the home route", () => {
    expect(breadcrumbList("/")).toBeNull();
  });

  it("returns null for unknown paths", () => {
    expect(breadcrumbList("/nope")).toBeNull();
  });

  it("builds a Home → route trail for inner pages", () => {
    const crumbs = breadcrumbList("/projects");
    expect(crumbs["@type"]).toBe("BreadcrumbList");
    expect(crumbs.itemListElement).toHaveLength(2);
    expect(crumbs.itemListElement[0]).toMatchObject({ position: 1, name: "Home" });
    expect(crumbs.itemListElement[1]).toMatchObject({ position: 2, name: "Projects" });
    expect(crumbs.itemListElement[1].item).toBe("https://derren-winata.com/projects");
  });
});
