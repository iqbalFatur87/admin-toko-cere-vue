<template>
  <v-row no-gutters>
    <v-col md="8">
      <v-form class="search-wrap">
        <v-row align="center">
          <v-col cols="9">
            <v-text-field
              v-model="ThisIsField1"
              label="Search"
              outlined
              @keyup="keymonitor"
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-btn color="primary" text>
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-form>

      <v-row>
        <v-col md="4" v-for="product in products" :key="product.id">
          <v-card class="card-product">
            <v-img :src="product.image"></v-img>
            <v-card-title>
              <v-row align="center">
                <v-col cols="9">
                  <v-link>{{ product.name }}</v-link>
                </v-col>
                <v-col cols="3">
                  <v-barcode :value="product.id" height="50px"></v-barcode>
                </v-col>
              </v-row>
            </v-card-title>
            <v-card-actions>
              <v-btn @click="addtocart(product.id)" color="primary" small>
                <v-icon>mdi-cart-plus</v-icon>
                Add
              </v-btn>
              <v-col class="price-wrap">
                <span class="price-new">$ {{ product.price }}</span>
              </v-col>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-col>

    <v-col md="4">
      <v-card>
        <v-card-text style="padding: 20px">
          <h5>Scan barcode to add product</h5>
          <stream-barcode-reader
            @decode="onDecode"
            @loaded="onLoaded"
          ></stream-barcode-reader>
        </v-card-text>
      </v-card>

      <v-card>
        <!-- ... Rest of the code for the shopping cart -->
        <v-card-text>
          <table class="table table-hover shopping-cart-wrap">
            <thead class="text-muted">
              <tr>
                <th scope="col">Item</th>
                <th scope="col" width="120">Qty</th>
                <th scope="col" width="120">Price</th>
                <th scope="col" class="text-right" width="200">Delete</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in allcartproduct" :key="product.id">
                <td>
                  <v-row align="center">
                    <v-img
                      :src="product.image"
                      class="img-thumbnail img-xs"
                    ></v-img>
                    <v-col cols="9">
                      <h6 class="title text-truncate">{{ product.name }}</h6>
                    </v-col>
                  </v-row>
                </td>
                <td class="text-center">
                  <v-btn-group>
                    <v-btn @click="decrement(product.id)" small>
                      <v-icon>mdi-minus</v-icon>
                    </v-btn>
                    <v-btn disabled>{{ product.quantity }}</v-btn>
                    <v-btn @click="increment(product.id)" small>
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </v-btn-group>
                </td>
                <td>
                  <v-col class="price-wrap">
                    <span class="price">$ {{ product.total }}</span>
                  </v-col>
                </td>
                <td class="text-right">
                  <v-btn @click="removefromcart(product.id)" icon>
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </table>
        </v-card-text>
      </v-card>

      <v-card class="box">
        <dl class="dlist-align">
          <dt>Tax:</dt>
          <dd class="text-right">0%</dd>
        </dl>
        <dl class="dlist-align">
          <dt>Discount:</dt>
          <dd class="text-right"><a href="#">0%</a></dd>
        </dl>
        <dl class="dlist-align">
          <dt>Sub Total:</dt>
          <dd class="text-right">${{ sum }}</dd>
        </dl>
        <dl class="dlist-align">
          <dt>Total:</dt>
          <dd class="text-right h4 b">${{ sum }}</dd>
        </dl>
        <hr />
        <v-form @submit="submitdata">
          <v-row>
            <v-col cols="12" style="padding-bottom: 5px">
              <p>Customer name:</p>
              <v-text-field
                v-model="order.customername"
                label="Customer name"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <p>Customer phone:</p>
              <v-text-field
                v-model="order.customerphone"
                label="Customer phone"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <hr />
          <v-row>
            <v-col cols="6">
              <v-btn color="error" dark block large>
                <v-icon>mdi-close-circle</v-icon>
                Cancel
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn color="primary" dark block large type="submit">
                <v-icon>mdi-shopping-bag</v-icon>
                {{ processing ? "Please wait" : "Submit" }}
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { StreamBarcodeReader } from "vue-barcode-reader";

export default {
  data() {
    return {
      ThisIsField1: "",
      order: {
        customername: "",
        customerphone: "",
      },
      processing: false,
    };
  },
  components: {
    StreamBarcodeReader,
  },
  computed: {
    ...mapState(["products"]),
  },
  methods: {
    ...mapActions([
      // addtocart: "cart/addtocart",
      // removefromcart: "cart/removefromcart",
      // increment: "cart/increment",
      // decrement: "cart/decrement",
      // submitdata: "cart/submitdata",
      "getProducts",
    ]),
    keymonitor() {
      this.processing = true;
      setTimeout(() => {
        this.processing = false;
      }, 2000);
    },
    onDecode(result) {
      console.log(result);
    },
    onLoaded(result) {
      console.log(result);
    },
  },
  created() {
    console.log("ProductPage.vue: Component created. Fetching products...");
    this.$store
      .dispatch("getProducts")
      .then(() => {
        console.log("ProductPage.vue: Products fetched successfully!");
      })
      .catch((error) => {
        console.error("ProductPage.vue: Error fetching products:", error);
      });
  },
};
</script>
<style scoped>
.search-wrap {
  float: left;
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 20px;
}

.card-product {
  margin-bottom: 20px;
}

.price-wrap {
  text-align: right;
}
</style>
