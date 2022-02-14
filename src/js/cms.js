import React from "react";
import CMS from "netlify-cms";

import HomePreview from "./cms-preview-templates/home";
import postPreview from "../../site/layouts/post/single.html";
import PostPreview from "./cms-preview-templates/post";
import ProductsPreview from "./cms-preview-templates/products";
import ValuesPreview from "./cms-preview-templates/values";
import ContactPreview from "./cms-preview-templates/contact";

// Example of creating a custom color widget
class ColorControl extends React.Component {
  render() {
    return <input
        style={{height: "80px"}}
        type="color"
        value={this.props.value}
        onInput={(e) => this.props.onChange(e.target.value)}
    />;
  }
}

const postPreviewConfig = {
  transformTemplate: template => {
    const updatedTemplate = template.replace(/\{\{\s?\.Content\s?}}/, '{{ renderMarkdown .Content }}');
    return `${updatedTemplate} {{ template "main" . }}`;
  },

  transformData: data => {
    const { title, description, body, image, date } = data.entry.get('data').toJS();
    const imageAssetProxy = data.getAsset(image);
    return {
      Title: title,
      Date: date instanceof Date ? date : date.toDate(),
      ReadingTime: 'x',
      Description: description,
      Params: {
        image: imageAssetProxy ? imageAssetProxy.toString() : null,
      },
      Content: body,
    };
  },
};


CMS.registerPreviewStyle("/css/main.css");
CMS.registerPreviewTemplate("home", HomePreview);
CMS.registerPreviewTemplate("post", postPreview, postPreviewConfig, "go");
CMS.registerPreviewTemplate("products", ProductsPreview);
CMS.registerPreviewTemplate("values", ValuesPreview);
CMS.registerPreviewTemplate("contact", ContactPreview);
CMS.registerWidget("color", ColorControl);
