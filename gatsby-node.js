const {
  getKontentItemNodeTypeName,
} = require("@kentico/gatsby-source-kontent")

exports.createSchemaCustomization = async api => {

  const {
    actions: { createTypes },
    schema,
  } = api;

  const type = getKontentItemNodeTypeName("navigation_item")


  const extendedType = schema.buildObjectType({
    name: type,
    fields: {
      navigationParent: {
        type: `[${type}]`,
        resolve: async (source, _args, context, _info) => {
          const allNavigationItems = await context.nodeModel.runQuery({
            query: {
              filter: {},
            },
            type: type,
            firstOnly: false,
          });

          // TODO note about restriction in Kontent
          return allNavigationItems.find(item =>
            item.preferred_language === source.preferred_language
            && item.elements["sub_nav"].value.includes(source.system.codename)
          )
        }
      }
    }
    // resolvedURL: {
    //   type: `string`,
    //   resolve: async (source, args, context, info) => {
    //     const allNavigationItems = await context.nodeModel.runQuery({
    //       query: {
    //         filter: {},
    //       },
    //       type: type,
    //       firstOnly: false,
    //     });

    //     const url = '/'; // /about/small-gas/subsection/<-
    //     let parent;
    //     let currentContextItem = source;
    //     do {
    //       parent = allNavigationItems.find(item =>
    //         item.preferred_language === currentContextItem.preferred_language
    //         && item.elements["sub_nav"].value.includes(currentContextItem.system.codename));

    //       url = "/" + parent.element.slug.value + url;
    //       currentContextItem = parent;
    //     } while (!parent)

    //     return url;
    //   }
    // }
  });

  createTypes(extendedType)
}