<template>
  <div>
    <!-- // use it when the page needs to incluse breadcrumbs  like the blog post page -->
     <!-- start -->
    <SharedAppBreadcrumb :breadcrumb="slug" />
    <!-- end -->
    <p>How to page</p>
  </div>
</template>

<script lang="ts" setup>
// use it when the page needs to incluse breadcrumbs
// staret here
const { params } = useRoute()
const slug = params.post as string
const breadcrumbs = [
  { name: 'Home', item: '/' },
  { name: 'post.value?.data.title' },
]
useSchemaOrg([
  defineBreadcrumb({
    itemListElement: breadcrumbs,
  }),
])

// end here

// seo HEAD
// start here

useHead({
  title: '',
  meta: [
    {
      name: 'description',
      content: 'post.value?.data.seo?.metaDescription',
    },
    {
      property: 'og:title',
      content: 'post.value?.data.seo?.metaTitle',
    },
    {
      property: 'og:description',
      content: 'post.value?.data.seo?.metaDescription',
    },
    {
      property: 'og:image',
      content: 'ogImage.value',
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      property: 'og:url',
      content: '`https://amd.codes/posts/${post.value?.data.slug}`',
    },
    {
      property: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      property: 'twitter:url',
      content: '`https://amd.codes/posts/${post.value?.data.slug}`',
    },
    {
      property: 'twitter:title',
      content: 'post.value?.data.seo?.metaTitle',
    },
    {
      property: 'twitter:description',
      content: 'post.value?.data.seo?.metaDescription',
    },
    {
      property: 'twitter:image',
      content: 'ogImage.value',
    },
    {
      property: 'twitter:image:alt',
      content: 'post.value?.data.seo?.metaDescription',
    },
    {
      name: 'keywords',
      content: 'post.value?.data.seo?.keywords',
    },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: '',
    },
  ],
})
// end here
</script>
