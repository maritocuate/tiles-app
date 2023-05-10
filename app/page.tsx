import getPosts, { 
  IPostsParams
} from './actions/getPosts'
import Container from "./components/Container"
import PostCard from "./components/posts/PostCard"
import getCurrentUser from "./actions/getCurrentUsers"

interface HomeProps {
  searchParams: IPostsParams
}

export default async function Home({ searchParams }: HomeProps) {
  const posts = await getPosts(searchParams)
  const currentUser = await getCurrentUser()

  return (
    <Container>
      <div
        className="
          pt-24
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-2
        "
      >
        {
          posts.map((post:any) => (
            <PostCard
              key={post.id}
              currentUser={currentUser}
              data={post}
            />
          ))
        }
      </div>
    </Container>
  )
}
