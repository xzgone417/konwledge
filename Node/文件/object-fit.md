`object-fit` 是一个 CSS 属性，用于指定替换元素（如 `<img />`, `<video>   `, `<object>     `
    等）如何适应其容器的尺寸。它通常用于图像和视频，以便控制当元素的宽高比与容器的宽高比不同时，图像或视频的显示方式。
    ### 

常用值和效果

 1. **`fill`**（默认值）： -
    内容会拉伸以完全填充容器，而不考虑保持原始宽高比。 -
    可能会导致图像或视频的变形。 ``css img { object-fit: fill; } `` 

2.  **`contain`**： - 内容保持其原始宽高比，并缩放以适应容器大小。 -
    整个内容都会显示，可能会在容器内留有空白区域。 ``css img { object-fit:     contain; } ``

3. **`cover`**： -
    内容保持其原始宽高比，并缩放以完全覆盖容器。 -
    容器内不会有空白，但内容的某些部分可能会被裁剪掉。 ``css img { object-fit:     cover; } `` 

4. **`none`**： - 内容不会缩放，保持其原始大小。 -
    如果内容大于容器，则只显示内容的一部分。 ``css img { object-fit: none; }     `` 

5. **`scale-down`**： - 内容将根据 `none` 或 `contain`
    的计算结果，选择一个较小的进行显示。 - 如果内容本身比容器小，则使用
    `none`，否则使用 `contain`。 ``css img { object-fit: scale-down; } `` ###
    使用示例
    假设你有一个固定尺寸的容器，想要放置一个图像，并希望图像以适当的方式适应容器，你可以这样做：
    ``html     <div style="width: 300px; height: 200px; border: 1px solid #000">       <img         src="example.jpg"         style="width: 100%; height: 100%; object-fit: cover"       />     </div>     ``

 在这个例子中，`object-fit: cover;`
    将确保图像以适当的比例填充整个容器，但图像的某些部分可能会被裁剪掉。 ###
    结论 `object-fit`
    属性为图像、视频等替换元素提供了灵活的适应方式，帮助开发者在响应式设计中更好地控制媒体内容的展示效果。根据需求选择合适的值，可以确保媒体内容在各种容器中都能以最佳的方式显示。
  `</object>`

</video>
