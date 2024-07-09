	const { createApp, ref } = Vue
	createApp({
		data () {
      return {
        posts: [],
        host: 'https://postsposts.vercel.app',
        postEndpoint: '/api/posts'
      }
		},
		computed: {
		},
		watch: {},
		methods: {
      async loadPosts() {
        const res = await fetch(`${this.host}${this.postEndpoint}`);
        if (!res.ok) {
          throw new Error('Failed to fetch posts');
        }
        this.posts = await res.json();
      },
      async searchPostByIdOrTitle(searchQuery) {
        await this.loadPosts();
        console.log(searchQuery.toLowerCase());
        const foundPosts = this.posts.filter(post => post.id === searchQuery || post.title.toLowerCase().includes(searchQuery.toLowerCase()));
        if (foundPosts) {
          this.posts = foundPosts;
        }
        else if (!foundPosts) {
          throw new Error(`Post with ID or title matching "${searchQuery}" not found`);
        }
      },
      async submitForm (event) {
        const form = event.target;
        const formData = new FormData(form);
        const title = formData.get('title');
        try {
          const res = await fetch(`${this.host}${this.postEndpoint}` , {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({title})
          })
          if (!res.ok) {
            throw new Error('Error creating a new post');
          }
          const posts = await res.json();
          console.log(posts);
          this.loadPosts();
        } catch (err) {
         console.log(err.message);
        }
      }
		},
    mounted () {
      this.loadPosts();
    }
    }).mount('#app');