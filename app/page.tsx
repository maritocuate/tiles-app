import Container from "./components/Container"
import getPosts, { 
  IPostsParams
} from './actions/getPosts'

interface HomeProps {
  searchParams: IPostsParams
}

export default async function Home({ searchParams }: HomeProps) {
  const posts = await getPosts(searchParams)

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
          gap-8
        "
      >
        {
          posts.map((post:any) => (
            <div key={post.id}>
              {post.title}
            </div>
          ))
        }
      </div>
    </Container>
  )
}
