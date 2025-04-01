

<script>
import $ from 'jquery'
import '../../assets/scss/scrollBar.scss';
export default {
  props: {
    id: {
      type: String,
      required:true
    },
    placeholder: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      required: true
    }
  },
  
  data() {
    return {
      searchText: '',
      filteredOptions: []
    }
  },

  mounted() {
    const $input = $(this.$refs.input)
    const $dropdown = $(this.$refs.dropdown)

    // 初始化选项
    this.filteredOptions = [...this.options]

    // 输入事件处理
    $input.on('input', e => {
      this.searchText = e.target.value
      this.filterOptions()
    })

    // 聚焦显示下拉框
    $input.on('focus', () => {
      $dropdown.show()
    })

    // 失焦隐藏下拉框（延迟处理点击冲突）
    $input.on('blur', () => {
      setTimeout(() => $dropdown.hide(), 50)
    })

    // 下拉项点击处理
    $dropdown.on('mousedown', '.dropdown-item', e => {
      e.preventDefault()
      this.searchText = $(e.target).text()
      $input.val(this.searchText).trigger('input')
      $dropdown.hide()
    })

    // 初始筛选
    this.filterOptions()
  },

  methods: {
    filterOptions() {
      const search = this.searchText.toLowerCase()
      this.filteredOptions = this.options.filter(option => 
        option.toLowerCase().includes(search)
      )
    }
  },

  computed: {
    value() {
      return this.searchText
    }
  }
}
</script>

<template>
  <div class="custom-input">
    <input 
      class="form-control"
      :id="id"
      ref="input"
      type="text"
      :placeholder="placeholder"
    >
    <ul class="dropdown" ref="dropdown">
      <li v-for="(option, index) in filteredOptions" 
          :key="index" 
          class="dropdown-item">
        {{ option }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.custom-input {
    position: relative;
    width: 300px;
  }
  
  .dropdown {
    position: absolute;
    width: 100%;
    max-height: 150px;
    overflow-y: auto;
    margin: 0;
    padding: 0;
    border: 1px solid #ccc;
    border-top: none;
    display: none;
    z-index: 1000;
    background: darkgray;
    color: white;
  }
  
  .dropdown-item {
    padding: 8px;
    cursor: pointer;
    list-style: none;
  }
  
  .dropdown-item:hover {
    /* background-color: #f0f0f0; */
    background: gray;
  }
</style>