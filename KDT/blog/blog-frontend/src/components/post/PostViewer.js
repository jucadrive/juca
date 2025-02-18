import styled from "styled-components";
import palette from "../../lib/styles/palette";
import Button from "../common/Button";
import Responsive from "../common/Responsive";
import SubInfo from "../common/SubInfo";
import Tags from "../common/Tags";

const PostViewerBlock = styled(Responsive)`
 margin-top: 4rem;

 `;

 const PostHead = styled.div`
 border-bottom : 1px solid ${palette.gray[2]};
 padding-bottom : 3rem;
 margin-bottom : 3rem;
 h1 {
    font-size : 3rem;
    ling-height: 1.5;
    margin: 0;
 }
 `;

 const PostContent = styled.div`
 font-size : 1.3125rem;
 color: ${palette.gray[8]};
 padding-bottom : 50px;`

 const PostViewer = ({ post, error, loading, actionButtons }) => {
    if(error) {
        if(error.response && error.response.status === 404) {
            return <PostViewerBlock>존재하지 않는 포스트입니다.</PostViewerBlock>
        }
        return <PostViewerBlock>오류 발생!</PostViewerBlock>;
    }
    //로딩 중이거나 아직 포스트 데이터가 없을 때 

    if(loading || !post ) {
        return null;
    }
    const { title, body, user, publishedDate, tags } = post;
    
    return(
        <PostViewerBlock>
            <PostHead>
                <h1>{title}</h1>
                <SubInfo
                    username={user.username}
                    publishedDate={publishedDate}
                    hasMarginTop>
                </SubInfo>
                <Tags tags={tags} />
            </PostHead>
            {actionButtons}
            <PostContent dangerouslySetInnerHTML={{ __html : body}} />
            <div style={{textAlign:'center'}}><Button cyan to='/postlist'>목록보기</Button></div>
        </PostViewerBlock>
    )
 };
 

 export default PostViewer;

