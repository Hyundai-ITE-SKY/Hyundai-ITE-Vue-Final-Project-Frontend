<!--컴포넌트 UI 정의-->
<template>
  <div>
    <div>
      <v-row no-gutters>
        <v-col align-self="auto" v-for="item in products['productlist']" :key="item.pno" cols="6">
          <div class>
            <product-item
              :bname="item.bname"
              :pname="item.pname"
              :pprice="item.pprice"
              :colors="item.colors"
              :isWish="checkIsWish(item.pid)"
              :pid="item.pid"
              @productItemHandleWish="WishCreateDelete"
            ></product-item>
          </div>
        </v-col>
      </v-row>
    </div>
    <div class="text-center">
      <v-container>
        <v-row justify="center">
          <v-col cols="12">
            <v-container class="max-width">
              <v-pagination
                v-model="pageNo"
                class="my-4"
                :length="pageLength"
                circle
                color="black"
                :total-visible="pageLength >= 100 ? 5 : 7"
              ></v-pagination>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import ProductItem from "./ProductItem.vue";
import apiProduct from "@/apis/product";
import apiMember from "@/apis/member";

export default {
  //컴포넌트의 대표 이름(devtools에 나오는 이름)
  name: "",
  //추가하고 싶은 컴포넌트 등록
  components: { ProductItem },
  //컴포넌트 데이터 정의
  data() {
    return {
      pageNo: 1,
      pageLength: 1,
      products: [],
    };
  },
  //컴포넌트 메서드 정의
  methods: {
    changePageNo(pageNo) {
      // 같은 컴포넌트 내에서 URL만 변경
      this.$router
        .push(
          `/product/list?large=${this.$route.query.large}&medium=${this.$route.query.medium}&small=${this.$route.query.small}&pageno=${pageNo}`,
        )
        .catch(() => {});
      // watch에서 데이터를 가져온다.
    },
    changeCategory(large, mideum, small) {
      this.category[0].text = large;
      this.category[1].text = mideum;
      this.category[2].text = small;

      this.category[0].isShow = true;
      if (mideum !== "none") {
        this.category[1].isShow = true;
        if (small !== "none") {
          this.category[2].isShow = true;
        } else {
          this.category[2].isShow = false;
        }
      } else {
        this.category[1].isShow = false;
      }
    },
    checkIsWish(pid) {
      const wishlist = this.$store.getters["product/getUserWishList"];
      for (let item of wishlist) {
        if (item.pid === pid) {
          return true;
        }
      }
      return false;
    },
    /* WishList에 상품 추가/삭제 */
    async WishCreateDelete(wishState, pid) {
      /* wishState가 false일 경우 wishList 테이블에서 제거 */
      if (!wishState) {
        await apiMember.deleteWishList(pid);
      } else {
        /* wishState가 true일 경우 wishList 테이블에 추가 */
        await apiMember.createWishList(pid);
      }

      const wishlist = await apiMember.getWishList();
      this.$store.commit("product/setUserWishList", wishlist.data);
      //this.getWishList();
    },
  },
  created() {
    let pageNo = this.$route.query.pageno;
    let large = this.$route.query.large;
    let medium = this.$route.query.medium;
    let small = this.$route.query.small;

    this.$store.commit("product/setCategory", [large, medium, small]);
    this.pageNo = parseInt(pageNo);

    apiProduct
      .getProductList(large, medium, small, pageNo)
      .then((response) => {
        this.products = response.data;
        this.pageLength = response.data["totalPages"];
      })
      .catch((error) => {
        console.log(error);
      });

    this.$store.commit("gnb/setCurrentPage", "productlist");
  },
  watch: {
    pageNo: function () {
      this.changePageNo(this.pageNo);
    },

    // 브라우저의 back 버튼을 이용해서 URL이 변경되었을 때 데이터 갱신을 위해 $route 감시
    $route(to, from) {
      let large = to.query.large;
      let medium = to.query.medium;
      let small = to.query.small;

      this.$store.commit("product/setCategory", [large, medium, small]);

      if (
        from.query.large === large &&
        from.query.medium === medium &&
        from.query.small === small
      ) {
        apiProduct
          .getProductList(large, medium, small, this.pageNo)
          .then((response) => {
            this.products = response.data;
            this.pageLength = response.data["totalPages"];
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        apiProduct
          .getProductList(large, medium, small, 1)
          .then((response) => {
            this.products = response.data;
            this.pageNo = 1;
            this.pageLength = response.data["totalPages"];
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>
<!--컴포넌트 스타일 정의-->
<style scoped></style>
