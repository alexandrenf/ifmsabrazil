import styled, { keyframes } from "styled-components"
import { Container, Grid } from "@mui/material"
import BlogPost from "./BlogPost.jsx"
import { Link } from "react-router-dom"
import { generateUrlFriendlyTitle } from "./characterConversion.jsx"
import Loading from "./Loading.jsx"

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

const BlogSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 80px 20px;
  background: linear-gradient(to bottom, #ffffff, #f8f9fa);
`

const Title = styled.h2`
  font-family: "Poppins", sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: #00508C;
  text-align: center;
  margin-bottom: 50px;
  position: relative;
  display: inline-block;
  animation: ${fadeIn} 0.8s ease-out forwards;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(to right, #00508c, #fac800);
    border-radius: 2px;
  }
`

const BlogContainer = styled(Container)`
  max-width: 1200px;
  animation: ${fadeIn} 0.8s ease-out forwards;
`

const ViewAllButton = styled(Link)`
  display: inline-block;
  margin-top: 40px;
  padding: 12px 30px;
  background-color: #00508c;
  color: white;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 80, 140, 0.2);
  
  &:hover {
    background-color: #003c6a;
    transform: translateY(-3px);
    box-shadow: 0 7px 20px rgba(0, 80, 140, 0.3);
  }
`

const BlogPostWrapper = styled.div`
  animation: ${slideIn} 0.6s ease-out forwards;
  animation-delay: ${(props) => props.$delay || "0s"};
  opacity: 0;
`

const Blog = ({ posts, loading }) => {
  if (loading) {
    return <Loading />
  }

  const sortPostsByDate = (posts) => {
    return posts.sort((a, b) => b["dia-mes-ano"] - a["dia-mes-ano"])
  }

  const prioritizePosts = (posts, maxPosts = 4) => {
    const sortedPosts = sortPostsByDate(posts)
    const forcedPosts = sortedPosts.filter((post) => post["forcar-pagina-inicial"])

    if (forcedPosts.length >= maxPosts) {
      return forcedPosts
    }

    const additionalPosts = sortedPosts.filter((post) => !post["forcar-pagina-inicial"])
    const finalPosts = forcedPosts.concat(additionalPosts.slice(0, maxPosts - forcedPosts.length))

    return finalPosts
  }

  const shownPosts = prioritizePosts(posts)

  return (
    <BlogSection>
      <Title>Últimas Notícias</Title>
      <BlogContainer>
        <Grid container spacing={4}>
          {shownPosts.map((post, index) => (
            <Grid item key={index} xs={12} md={6}>
              <BlogPostWrapper $delay={`${0.1 + index * 0.1}s`}>
                <Link
                  to={`/arquivo/${post.id}/${generateUrlFriendlyTitle(post.title)}`}
                  style={{ textDecoration: "none" }}
                >
                  <BlogPost post={post} />
                </Link>
              </BlogPostWrapper>
            </Grid>
          ))}
        </Grid>
        <div style={{ textAlign: "center" }}>
          <ViewAllButton to="/noticias">Ver todas as notícias</ViewAllButton>
        </div>
      </BlogContainer>
    </BlogSection>
  )
}

export default Blog

