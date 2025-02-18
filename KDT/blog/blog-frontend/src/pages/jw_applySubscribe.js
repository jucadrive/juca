//useRef 는 직접 DOM 요소를 건들여야할 때 해당하는 요소에 ref={name}을 부여하고
// const aa = useRef(name) 으로 하면 aa는 name에 해당하는 요소들을 가져올 수 있다.
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import style from "../css/jw_applySubscribe.module.css";
import AddCart from "../component/jw_addCart";
import Slide from "../component/jw_swiper";
import {
  contentGetRdc,
  getKeyConvertJSRdc,
  totalPriceRdc,
  discountRdc,
} from "../data/jw_data";
import useAxios from "../additional_features/jw_useAxios";
import contentsSelect from "../additional_features/jw_contentsSelect";
import sessionStorage from "../additional_features/jw_sessionStorage";
import CanvasImage from "../additional_features/jw_canvasRGB";
import comma from "../additional_features/jw_amount_notation";
import HeaderContainer from "../components/common/HeaderContainer";
import TopBtnjw from '../component/jw_topBtn';

let [a, c, k, t, d] = [[], [], [], 0, 0];

function ApplySubscribe_jw() {
  const contentsData = useAxios("http://localhost:4001/data"),
    [filteredData, setFilteredData] = useState([]),
    [onOff, setOnOff] = useState([]),
    [menuOnOff, setMenuOnOff] = useState([]),
    [isTrue, setIsTrue] = useState(),
    data = useSelector((store) => store.dataSet),
    key = data.getKeyConvertJS,
    totalPrice = data.totalPrice,
    discount = data.discount,
    dispatch = useDispatch();
    

  const canvasRef = useRef(null);

  const categories = [
    { link: "/main", category: "all" },
    { link: "/main", category: "OTT/뮤직" },
    { link: "/main", category: "자기개발" },
    { link: "/main", category: "도서/아티클" },
    { link: "/main", category: "자기관리" },
    { link: "/main", category: "식품" },
    { link: "/main", category: "단기렌탈" },
    { link: "/main", category: "반려동물" },
    { link: "/main", category: "여행" },
  ];

  useEffect(() => {
    dispatch(contentGetRdc(contentsData));
    setFilteredData(contentsData);
    let m = [true, false, false, false, false, false, false, false, false];
    setMenuOnOff(m);
  }, [dispatch, contentsData]);

  // 카테고리를 눌렀을 때 함수
  function menuClick(e) {
    let [f, m, i] = [[], [], 0];

    for (var j = 0; j < categories.length; j++) {
      m[j] = false;
    }

    categories.forEach((element) => {
      switch (e.target.id) {
        case element.category:
          m[i] = true;
          break;
      }
      i++;
    });
    // 카테고리 'all'을 눌렀을 때 전체 data출력 아닐땐 category에 해당하는
    // 데이터만 출력
    if (e.target.id !== "all") {
      f = contentsData.filter((x) => x.category === e.target.id);
      for (var j=0; j<f.length; j++){

        k[j]=onOff[(f[j].id.slice(2,3)-1)]
          console.log(f[j].id.slice(2,3)-1)
          console.log(k)
        
      }
      setOnOff(k)
      setFilteredData(f);
    } 
    else {
      f = contentsData;
      // k=[]
      // for (var j=0; j<f.length; j++){

      //   k=[...k,onOff[(f[j].id.slice(2,3)-1)]]
      //     console.log(k)
        
      // }
      setOnOff(a)
      setFilteredData(f);
    }

    setMenuOnOff(m);


  }
  // 컨텐츠를 누르면 해당하는 페이지로 이동
  function moveToDiscription(e) {}
  // +담기 버튼을 클릭 시 함수
  function addBtnOnClick(e) {
    e.preventDefault();
    const resultData = contentsData.find((x) => x.id === e.target.id);
    [a, c, t, d] = contentsSelect(contentsData, resultData, e);

    setOnOff(c);

    dispatch(getKeyConvertJSRdc(sessionStorage(a)));
    dispatch(totalPriceRdc(t));
    dispatch(discountRdc(d));

    if (onOff) {
      setIsTrue(onOff.includes(true));
    }
  }

  //  onOff는 contentsSelect 함수에서 return 된 contentsData.length를 갖는 onoff 기능 배열이다.
  //  버튼 클릭을 하면 addBtnOnClick 실행 > contentsSelect 실행 > onOff 데이터 변경이 된다.
  //  즉 버튼을 누를 때 마다 실행. onOff.include(true) 함수는 onOff 배열 중 하나라도 true가 있는지
  //  검사해주는 함수이다. 하나라도 일치하면 true, 아니면 false
  useEffect(() => {
    if (onOff) {
      setIsTrue(onOff.includes(true));
    }
  }, [onOff]);

  // console.log("applySubscribe rendering..");
  return (
    <>
     <HeaderContainer />
     <TopBtnjw />
      <div className={style.container}>
        <div className={style.container1}>
          <div className={style.main}>
            <div className={style.mainLeft}>
              <div className={style.swiperArea}>
                <Slide />
              </div>
              <div className={style.noticeArea}>
                <div
                  style={{
                    borderRadius: "5px",
                    width: "30px",
                    height: "20px",
                    backgroundColor: "rgb(64, 143, 247)",
                    color: "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: "10px",
                  }}
                >
                  공지
                </div>
                많은 사랑 부탁드립니다.
              </div>
              <div className={style.menuArea}>
                <Swiper pagination={{ clickable: true }}>
                  <SwiperSlide className={style.swiperSlide}>
                    {categories.map((value, index) => {
                      return (
                        <div
                          key={value.category}
                          className={
                            menuOnOff[index] ? style.menu1 : style.menu
                          }
                        >
                          <Link
                            to={value.link}
                            id={value.category}
                            onClick={menuClick}
                          >
                            {value.category}
                          </Link>
                        </div>
                      );
                    })}
                  </SwiperSlide>
                  <SwiperSlide className={style.swiperSlide}>
                    {categories.map((value, index) => {
                      return (
                        <div
                          key={value.category}
                          className={
                            menuOnOff[index] ? style.menu1 : style.menu
                          }
                        >
                          <Link
                            to={value.link}
                            id={value.category}
                            onClick={menuClick}
                          >
                            {value.category}
                          </Link>
                        </div>
                      );
                    })}
                  </SwiperSlide>
                </Swiper>
                <div className={style.menuBtn}>
                  <div>＾</div>
                </div>
              </div>
              <div className={style.subscribeContentArea}>
                {filteredData.map((value, index) => {
                  return (
                    <div
                      key={value.id}
                      ref={canvasRef}
                      className={style.subscribeContentBox}
                    >
                      {onOff[index] ? (
                        <>
                          <CanvasImage url={value.url} />
                        </>
                      ) : (
                        ""
                      )}
                      <div className={style.contentIcon}>
                        <img src={value.url} alt="" />
                      </div>
                      <Link
                        onClick={moveToDiscription}
                        to={`category=/${value.id}`}
                      >
                        <div
                          id={value.id}
                          className={
                            onOff[index]
                              ? style.contentArea1
                              : style.contentArea
                          }
                        >
                          <div className={style.content}>
                            <div
                              id={value.id}
                              className={
                                onOff[index]
                                  ? style.contentTitle1
                                  : style.contentTitle
                              }
                            >
                              {value.title} &gt;
                            </div>
                            <div
                              id={value.id}
                              className={
                                onOff[index]
                                  ? style.contentText1
                                  : style.contentText
                              }
                            >
                              {value.text}
                            </div>
                            <button
                              id={value.id}
                              onClick={addBtnOnClick}
                              className={style.addBtn}
                            >
                              {onOff[index] ? "- 빼기 " : "+ 담기"}
                            </button>
                          </div>
                        </div>
                      </Link>
                      <div className={style.priceTextArea}>
                        <div>
                          <div>
                            {Math.round(
                              (1 -
                                (value.price - value.discount) / value.price) *
                                100
                            ) + "%"}
                          </div>
                          <div>월 {comma(value.price - value.discount)}원</div>
                        </div>
                        <div>
                          <strike>월 {comma(value.price)} 원</strike>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className={style.mainRight}>
              <div className={style.rightContentArea}>
                {isTrue ? (
                  <AddCart
                    c={onOff}
                    totalPrice={totalPrice}
                    getKeyConvertJS={key}
                    discount={discount}
                  />
                ) : (
                  ""
                )}

                <div
                  style={isTrue ? { marginTop: 90 + "px" } : null}
                  className={style.goTOSubscribe}
                >
                  <div className={style.goTOSubscribeTxt}>
                    <div className={style.todaySubscribeIs}>
                      오늘은 어떤 상품을
                      <br /> 구독할까요?
                    </div>
                    <div className={style.toLogin}>
                      로그인 하러 가기{" "}
                      <i
                        style={{ marginLeft: "5px" }}
                        className="fa-solid fa-arrow-right"
                      ></i>
                    </div>
                    <div className={style.subscribing}>현재 구독중인 상품</div>
                    <div className={style.ckeckYourContent}>
                      <div className={style.cautionBtn}>i</div> <pre> </pre>
                      로그인 하고 구독중인 상품을 확인해 보세요
                    </div>
                  </div>
                </div>
                <div className={style.cs}>
                  <div className={style.csMenuArea1}>
                    <div className={style.csMenuImg1}>
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQON_GawiUP2UC1l9Ib0DKuZhZRzXk13jXadg&usqp=CAU"
                        alt=""
                      />
                    </div>
                    <div className={style.csMenuTxt1}>JW 소개</div>
                  </div>
                  <div className={style.csMenuArea2}>
                    <div className={style.csMenuImg2}>
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQON_GawiUP2UC1l9Ib0DKuZhZRzXk13jXadg&usqp=CAU"
                        alt=""
                      />
                    </div>
                    <div className={style.csMenuTxt2}>고객센터</div>
                  </div>
                  <div className={style.csMenuArea3}>
                    <div className={style.csMenuImg3}>
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQON_GawiUP2UC1l9Ib0DKuZhZRzXk13jXadg&usqp=CAU"
                        alt=""
                      />
                    </div>
                    <div className={style.csMenuTxt3}>재원닷컴</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ApplySubscribe_jw;
