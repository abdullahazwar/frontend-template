import { createApp, ref, computed } from 'vue';
const html = String.raw;
const C = globalThis.TemplateCore;
const products = [
  {
    id: 'chair',
    name: 'Kursi Sela',
    category: 'Furnitur',
    price: 1250000,
    stock: 8,
  },
  {
    id: 'lamp',
    name: 'Lampu Arah',
    category: 'Pencahayaan',
    price: 450000,
    stock: 12,
  },
  {
    id: 'bag',
    name: 'Tas Rona',
    category: 'Aksesori',
    price: 185000,
    stock: 20,
  },
  {
    id: 'camera',
    name: 'Kamera Mono',
    category: 'Elektronik',
    price: 4200000,
    stock: 6,
  },
];
createApp({
  setup() {
    const query = ref('');
    const cart = ref([]);
    const message = ref('');
    const visible = computed(() =>
      products.filter((p) => C.matches(p.name + ' ' + p.category, query.value)),
    );
    const total = computed(() => C.cartTotal(cart.value));
    const count = computed(() =>
      cart.value.reduce((s, p) => s + p.quantity, 0),
    );
    function add(product) {
      try {
        cart.value = C.cartAdd(cart.value, product, 1);
        message.value = product.name + ' ditambahkan ke keranjang demo.';
      } catch (error) {
        message.value = error.message;
      }
    }
    function subtract(key) {
      cart.value = cart.value
        .map((p) => (p.key === key ? { ...p, quantity: p.quantity - 1 } : p))
        .filter((p) => p.quantity > 0);
      message.value = 'Satu unit dikurangi dari keranjang demo.';
    }
    function review() {
      message.value =
        'Ringkasan demo: ' +
        count.value +
        ' produk, ' +
        C.money(total.value) +
        '. Tidak membuat pesanan atau pembayaran.';
    }
    return {
      query,
      cart,
      message,
      visible,
      total,
      count,
      add,
      subtract,
      review,
      money: C.money,
    };
  },
  template: html` <main
    id="main"
    class="wrap page stack"
  >
    <header class="row between">
      <a
        class="brand"
        href="#main"
        >rakit / vue</a
      ><a href="#cart">Keranjang ({{ count }}) ↓</a>
    </header>
    <section class="stack-sm">
      <p class="eyebrow">Katalog / Native Vue</p>
      <h1>Pilihan untuk keseharian.</h1>
      <p class="lead">
        Pencarian dan total memakai computed state. Data dan keranjang hanya
        berada di memori tab.
      </p>
    </section>
    <div class="vue-shop">
      <section class="stack">
        <label
          class="field"
          for="search"
          >Cari produk<input
            id="search"
            v-model="query"
            type="search"
            placeholder="Kursi, lampu, tas..."
        /></label>
        <p
          class="muted small"
          role="status"
        >
          {{ visible.length }} produk ditemukan
        </p>
        <div class="grid cols-2 vue-products">
          <article
            v-for="p in visible"
            :key="p.id"
            class="product"
          >
            <img
              class="artwork product-media"
              :src="'../../assets/art/' + p.id + '.svg'"
              :alt="p.name"
              loading="lazy"
            />
            <div>
              <p class="eyebrow">{{ p.category }}</p>
              <h2>{{ p.name }}</h2>
              <p class="space">{{ money(p.price) }}</p>
              <p class="small muted">Stok ilustrasi {{ p.stock }}</p>
            </div>
            <button
              class="btn"
              @click="add(p)"
            >
              Tambah {{ p.name }}
            </button>
          </article>
        </div>
        <p
          v-if="!visible.length"
          class="empty"
        >
          Produk tidak ditemukan. Ubah pencarian.
        </p>
      </section>
      <aside
        id="cart"
        class="panel stack vue-cart"
      >
        <h2>Keranjang demo</h2>
        <p
          v-if="!cart.length"
          class="muted"
        >
          Keranjang masih kosong.
        </p>
        <div
          v-for="item in cart"
          :key="item.key"
          class="stack-sm border-bottom space"
        >
          <h3>{{ item.name }}</h3>
          <p class="small muted">
            {{ item.quantity }} × {{ money(item.price) }}
          </p>
          <div class="row between">
            <button
              class="btn secondary small"
              @click="subtract(item.key)"
              :aria-label="'Kurangi satu ' + item.name"
            >
              − 1</button
            ><b>{{ money(item.quantity * item.price) }}</b
            ><button
              class="btn secondary small"
              @click="add(item)"
              :aria-label="'Tambah satu ' + item.name"
            >
              + 1
            </button>
          </div>
        </div>
        <div class="row between"><b>Total</b><b>{{ money(total) }}</b></div>
        <button
          class="btn"
          :disabled="!cart.length"
          @click="review"
        >
          Periksa ringkasan
        </button>
        <p class="small muted">
          Ongkir belum dihitung. Pembayaran tidak tersedia pada demo.
        </p>
        <p
          class="form-status"
          role="status"
        >
          {{ message }}
        </p>
      </aside>
    </div>
    <footer class="footer">
      Identitas toko, harga, dan stok bersifat fiktif.
    </footer>
  </main>`,
}).mount('#vue-root');
