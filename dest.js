/*global Vue*/
/*global axios*/

var app = new Vue({
  el: '#app',
  data: {
    items: [],
    text: '',
    show: 'all',
    message: '',
  },
  created: function() {
    this.getItems();
  },
  computed: {
    activeTodos() {
      return this.items.filter(item => {
        return !item.completed;
      });
    },
    filteredTodos() {
      if (this.show === 'active')
        return this.items.filter(item => {
         return !item.completed;
        });
      if (this.show === 'completed')
        return this.items.filter(item => {
          return item.completed;
         });
      return this.items;
    },
    completedGoals(){
        return this.items.filter(item => {
            return item.completed;
        });
    },
  },
  methods: {
    showAll() {
      this.show = 'all';
    },
    deleteCompleted() {
      this.items.forEach(item => {
        if (item.completed)
          this.deleteItem(item);
      });
    },
    showActive() {
      this.show = 'active';
    },
    showCompleted() {
      this.show = 'completed';
    },
    async getItems() {
      try {
        console.log("in get items");
        const response = await axios.get("/api/items");
        this.items = response.data;
        //return true;
      } catch (error) {
        console.log(error);
      }
    },
     async addItem() {
      try {
        console.log("in add item");
        console.log("text", this.text);
        const response = await axios.post("api/items", {
          text: this.text,
          completed: false,
        });
        this.text = "";
        this.getItems();
        console.log("exiting add item");
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async completeItem(item) {
      try {
        const response = axios.put("/api/items/" + item.id, {
          text: item.text,
          completed: !item.completed,
        });
        this.getItems();
      } catch (error) {
        console.log(error);
      }
    },
    async deleteItem(item) {
      try {
        console.log("in delete", item);
        const response = await axios.delete("/api/items/" + item.id);
        console.log("after app delete");
        this.getItems();
      } catch (error) {
        console.log(error);
      }
    },
  }
});