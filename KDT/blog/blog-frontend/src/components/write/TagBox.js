import React, {useState, useCallback, useEffect} from "react";
import styled from "styled-components";
import palette from "../../lib/styles/palette";
import Category from "../common/Category";
import axios from "../../../node_modules/axios/index";



const TagBoxBlock = styled.div`
 width: 100%;
 border-top: 1px solid ${palette.gray[2]};
 padding-top: 2rem;
 
 h4{
    color: ${palette.gray[8]};
    margin-top: 0;
    margin-bottom: 0.5rem;
 }
 `;

 const TagForm =styled.form`
 border-radius: 4px;
 overflow: hidden;
 display: flex;
 width: 256px;
 border: 1px solid ${palette.gray[9]};
 input,
 button{
    outline: none;
    border: none;
    font-size: 1rem;
 }
 
 input{
    padding: 0.5rem;
    flex: 1;
    min-width: 0;
 }
 button{
    cursor: pointer;
    padding-right: 1rem;
    padding-left: 1rem;
    border: none;
    background: ${palette.gray[8]};
    color: white;
    font-weight: bold;
    &:hover{
        background: ${palette.gray[6]};
    }
 }
 `;

 const Tag = styled.div`
 margin-right: 0.5rem,
 color: ${palette.gray[6]};
 cursor: pointer;
 &:hover {
    opacity: 0.5;
 }
 `;

 const TagListBlock = styled.div`
 display: flex;
 margin-top: 0.5rem;
 `;

 //react.memo를 사용하여 tag값이 바뀔때만 리렌더링 되도록 처리 //onRemove 함수 정리할 것 배열에서 삭제할 때 사용하는 함수

 const TagItem = React.memo(({ tag, onRemove}) => (
   <Tag onClick={() => onRemove(tag)}>#{tag}</Tag>
 ));

 // React.memo를 사용하여 tags값이 바뀔 때만 리렌더링 되도록 처리 
 const TagList = React.memo(({ tags, onRemove })=> (
    <TagListBlock>
        {tags.map(tag=> (
            <TagItem key={tag} tag={tag} onRemove={onRemove}/>
        ))}
    </TagListBlock>
 ));

 const TagBox = ( {tags, onChangeTags}) => {
   const [input, setInput] = useState('');
   const [localTags, setLocalTags] = useState([]);
//useCallback정리
   const insertTag = useCallback(
      tag => {
         if(!tag) return//공백이라면 추가하지 않음
         if(localTags.includes(tag)) return; //이미 있다면 추가하지 않음
         const nextTags = [...localTags, tag];
         setLocalTags(nextTags);
         onChangeTags(nextTags);
      },
      [localTags, onChangeTags],
   )

   const onRemove = useCallback(
      tag => {
         const nextTags = localTags.filter(t=> t !==tag);
         setLocalTags(nextTags);
         onChangeTags(nextTags);
      },
      [localTags, onChangeTags],
   );

   const onChange = useCallback(e=>{
       setInput(e.target.value);
   }, []);

   const onSubmit = useCallback(
      e=> {
         e.preventDefault();
         insertTag(input.trim()); //앞뒤 공백을 없앤 후 등록
         setInput('');
      },
      [input, insertTag],
   );

   //tags 값이 바뀔 때
   useEffect(() => {
      setLocalTags(tags);
   }, [tags])

    return (
        <TagBoxBlock>
            <h4>태그</h4>
            <TagForm onSubmit={onSubmit}>
                <input placeholder="태그를 입력하세요"
                  value={input}
                  onChange={onChange}
                  />
                <button type="submit">추가</button>
            </TagForm>
            <TagList tags={localTags} onRemove={onRemove}/>
        </TagBoxBlock>    
    )
 }

 export default TagBox;