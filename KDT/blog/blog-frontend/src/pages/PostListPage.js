import HeaderContainer from "../components/common/HeaderContainer";
import PostListContainer from "../containers/posts/PostListContainer";
import PaginationContainer from "../containers/posts/PaginationContainer";


const PostListPage = () => {
    return <>
          <HeaderContainer />
           <PostListContainer />
           <PaginationContainer />
           </> 
}

export default PostListPage;