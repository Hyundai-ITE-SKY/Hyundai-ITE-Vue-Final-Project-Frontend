<!-- 컴포넌트 UI 정의 주의할 점 : 루트 Element가 하나만 있어야한다. -->
<template>
  <div>
    <div>
      <v-carousel :show-arrows="false" hide-delimiter-background cycle dark>
        <v-carousel-item :src="productInfo.colors[colorIdx].cimage1"></v-carousel-item>
        <v-carousel-item :src="productInfo.colors[colorIdx].cimage2"></v-carousel-item>
        <v-carousel-item :src="productInfo.colors[colorIdx].cimage3"></v-carousel-item>
      </v-carousel>
    </div>
    <div style="display: flex" class="justify-center align-center">
      <div v-for="(color, i) in productInfo.colors" :key="color.ccolorcode" class="ml-1 mr-1 mt-2">
        <v-img :src="color.ccolorimage" width="18px" height="18px" @click="colorIdx = i"></v-img>
        <div class="text-center" style="font-size: 0.7rem; font-weight: bolder">
          {{ color.ccolorcode }}
        </div>
      </div>
    </div>
    <div>
      <div class="mt-2 ml-3 mr-3 align-center" style="display: flex">
        <div class="text-truncate" style="font-size: 1rem; font-weight: bolder">
          {{ productInfo.bname }}
        </div>
        <div class="ml-auto" @click="WishCreateDelete">
          <v-icon v-if="!state">mdi-heart-outline</v-icon>
          <v-icon v-if="state" style="color: red">mdi-heart</v-icon>
        </div>
      </div>
      <div class="mt-1 ml-3 mr-3 align-center" style="display: flex">
        <div class="text-truncate" style="font-size: 0.875rem; font-weight: bolder; color: #252525">
          {{ productInfo.pname }}
        </div>
        <div
          class="text-truncate ml-auto text-decoration-line-through text--disabled"
          style="font-size: 0.875rem; font-weight: bolder"
        >
          {{ productInfo.pprice.toLocaleString() }}원
        </div>
        <div class="text-truncate ml-3" style="font-size: 1rem; font-weight: bolder">
          {{
            ((productInfo.pprice * (100 - $store.state.product.gradeSale)) / 100).toLocaleString()
          }}원
        </div>
      </div>
      <div
        class="mt-2 ml-3 mr-3 pa-3"
        style="font-size: 0.875rem; color: #252525; background-color: #f7f6f3"
      >
        "{{ productInfo.pdetail }}"
      </div>
      <v-divider class="mt-5 mb-3"></v-divider>
      <div class="ml-3 mr-3 align-center" style="display: flex">
        <div style="font-size: 0.875rem">회원등급 혜택가</div>
        <div class="ml-3 text--disabled" style="font-size: 0.7rem; font-weight: bolder">
          현재 {{ $store.state.product.gradeSale }}% 할인 적용 중
        </div>
        <div class="ml-auto text-truncate" style="font-size: 1rem; font-weight: bolder">
          {{
            ((productInfo.pprice * (100 - $store.state.product.gradeSale)) / 100).toLocaleString()
          }}원
        </div>
      </div>
      <v-divider class="mt-3 mb-3"></v-divider>
      <div class="ml-3 mr-3 align-center" style="display: flex">
        <div style="font-size: 0.875rem">POINT</div>
        <div class="ml-3 text--disabled" style="font-size: 0.7rem; font-weight: bolder">
          상품 구매시 원가의 10% 적립
        </div>
        <div
          class="ml-auto text-truncate"
          style="font-size: 0.875rem; font-weight: bolder; color: #252525"
        >
          {{
            Math.floor(
              (productInfo.pprice * (100 - $store.state.product.gradeSale)) / 10000,
            ).toLocaleString()
          }}p
        </div>
      </div>
      <v-divider class="mt-3 mb-4"></v-divider>
      <div class="ml-3 mr-3 align-top" style="display: flex">
        <div style="font-size: 0.7rem; width: 30vw; font-weight: bolder">상품코드</div>
        <div class="ml-3 text-truncate" style="font-size: 0.7rem; color: #252525">
          {{ productInfo.pid }}
        </div>
      </div>
      <div class="mt-2 ml-3 mr-3 align-top" style="display: flex">
        <div style="font-size: 0.7rem; width: 30vw; font-weight: bolder">배송비</div>
        <div class="ml-3 text-truncate" style="font-size: 0.7rem; color: #252525">
          30,000 미만 구매시 배송비 3,000원<br />
          (제주/도서산간 추가 배송비가 발생할 수 있습니다.)
        </div>
      </div>
      <div class="mt-2 ml-3 mr-3 mb-5 align-top" style="display: flex">
        <div style="font-size: 0.7rem; width: 30vw; font-weight: bolder">배송정보</div>
        <div class="ml-3 text-truncate" style="font-size: 0.7rem; color: #252525">
          결제 완료 후 평균 1일 이내 출고(공휴일 제외)
        </div>
      </div>
    </div>
    <div style="background-color: #eeeeee; height: 15px" class="mb-3"></div>
    <div class="ml-3" style="font-weight: bolder; font-size: 0.875rem">상품평</div>
    <v-divider class="mt-3 mb-3"></v-divider>
    <div>
      <div class="px-3 mb-4">
        <product-review
          v-for="review of reviewArray"
          :key="review.rno"
          :review="review"
        ></product-review>
        <div v-if="reviewArray.length === 0" class="text-center text--disabled my-6" style="font-size: 0.875rem">
          등록된 상품평이 없습니다.
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import apiProduct from "@/apis/product";
import apiMember from "@/apis/member";
import ProductReview from "./ProductReview.vue";

export default {
  //component의 대표 이름(devTools에 나오는 이름)
  name: "ProductDetail",
  //추가하고 싶은 컴포넌트를 등록
  components: { ProductReview },
  //컴포넌트 데이터 정의
  data: () => ({
    colorIdx: 0,
    state: false,
    reviewArray: [
      {
        rno: 1,
        mid: "mid1",
        mname: "고길동",
        pid: "TH2B3NPC677NP1",
        pname: "뉴스트레이트 크롭 데님 팬츠",
        pcolor: "CR",
        psize: "86",
        rdate: "2021-12-22T10:02:40.000+00:00",
        rrate: 5,
        rprice: 0,
        rcomfortable: 0,
        rtitle: "만족합니다",
        rcontent: "가격에 비해 품질이 좋네요~ ^^",
      },
    ],
    productInfo: {
      pid: "PL2B7WSC004W",
      bname: "3.1 Phillip Lim",
      clarge: "WOMEN",
      cmedium: "SKIRT",
      csmall: "LONG|MAXI SKIRT",
      pno: 5491,
      pname: "[21FW] 믹스 플리츠 스커트",
      pprice: 950000,
      pdetail:
        "밑단이 마치 꽃잎을 연상시키는 이 스커트는 여러가지의 간격과 모양으로 이루어진 플리츠 텍스처로 어디서도 볼 수 없는 3.1 PHILLIP LIM만의 감각이 느껴집니다. 우아하면서도 섬세한 실루엣을 연출하여 룩에 페미닌한 분위기를 불어넣어줍니다.",
      pseason: "FW",
      ptotalamount: 0,
      colors: [
        {
          pid: "PL2B7WSC004W",
          ccolorcode: "NY",
          cimage1:
            "http://newmedia.thehandsome.com/PL/2B/FW/PL2B7WSC004W_NY_W01.jpg/dims/resize/684x1032/",
          cimage2:
            "http://newmedia.thehandsome.com/PL/2B/FW/PL2B7WSC004W_NY_W02.jpg/dims/resize/684x1032/",
          cimage3:
            "http://newmedia.thehandsome.com/PL/2B/FW/PL2B7WSC004W_NY_W03.jpg/dims/resize/684x1032/",
          ccolorimage: "http://newmedia.thehandsome.com/PL/2B/FW/PL2B7WSC004W_NY_C01.jpg",
          cmatchpid: "PL2B7KTO004W_NY",
          stocks: [
            {
              pid: "PL2B7WSC004W",
              ccolorcode: "NY",
              ssize: "64",
              samount: 4,
            },
            {
              pid: "PL2B7WSC004W",
              ccolorcode: "NY",
              ssize: "67",
              samount: 2,
            },
            {
              pid: "PL2B7WSC004W",
              ccolorcode: "NY",
              ssize: "61",
              samount: 1,
            },
          ],
        },
        {
          pid: "PL2B7WSC004W",
          ccolorcode: "PK",
          cimage1:
            "http://newmedia.thehandsome.com/PL/2B/FW/PL2B7WSC004W_PK_W01.jpg/dims/resize/684x1032/",
          cimage2:
            "http://newmedia.thehandsome.com/PL/2B/FW/PL2B7WSC004W_PK_W02.jpg/dims/resize/684x1032/",
          cimage3:
            "http://newmedia.thehandsome.com/PL/2B/FW/PL2B7WSC004W_PK_W03.jpg/dims/resize/684x1032/",
          ccolorimage: "http://newmedia.thehandsome.com/PL/2B/FW/PL2B7WSC004W_PK_C01.jpg",
          cmatchpid: "PL2B7KTO007W_NY",
          stocks: [
            {
              pid: "PL2B7WSC004W",
              ccolorcode: "PK",
              ssize: "61",
              samount: 2,
            },
            {
              pid: "PL2B7WSC004W",
              ccolorcode: "PK",
              ssize: "64",
              samount: 2,
            },
          ],
        },
      ],
    },
  }),
  //컴포넌트 메서드 정의
  methods: {
    /* wishlist의 상품인 경우 state=true */
    checkIsWish() {
      const wishlist = this.$store.getters["product/getUserWishList"];
      for (let wish of wishlist) {
        if (this.productInfo.pid === wish.pid) {
          this.state = true;
        }
      }
    },
    async WishCreateDelete() {
      this.state = !this.state;
      if (!this.state) {
        await apiMember.deleteWishList(this.productInfo.pid);
      } else {
        await apiMember.createWishList(this.productInfo.pid);
      }

      const wishlist = await apiMember.getWishList();
      this.$store.commit("product/setUserWishList", wishlist.data);
    },
  },
  created() {
    this.$store.commit("gnb/setCurrentPage", "productdetail");
    let pid = this.$route.query.pid;
    apiProduct
      .getProduct(pid)
      .then((response) => {
        this.productInfo = response.data;
        this.$store.commit("product/setSelectedProduct", this.productInfo);

        const colorArray = [];
        const sizeObject = {};

        for (let color of this.productInfo.colors) {
          colorArray.push(color.ccolorcode);
          const sizeArray = [];
          for (let stock of color.stocks) {
            sizeArray.push(stock.ssize);
          }
          sizeObject[color.ccolorcode] = sizeArray;
        }

        this.$store.commit("product/setColorList", colorArray);
        this.$store.commit("product/setSizeList", sizeObject);
        this.checkIsWish();
      })
      .catch((error) => {
        console.log(error);
      });
    apiProduct
      .getReview(pid)
      .then((response) => {
        this.reviewArray = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
<!--scoped : 지역변수, 없으면 전역 style이 된다. 붙이는게 좋다
    컴포넌트 스타일-->
<style scoped></style>
