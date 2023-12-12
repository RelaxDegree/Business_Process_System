<template>
  <el-card
    class="project-box"
    shadow="always"
    body-style="padding: '8px 8px 8px 0px'"
  >
    <div class="project-box-item">
      <div class="project-name">
        <div class="d-flex width-full flex-items-center">
          <span data-view-component="true" class="position-relative"
            ><a href="#"
              @click="handleDetail"
              data-view-component="true"
              class="min-width-0 Link text-bold flex-auto"
            >
              <span class="repo"> {{item.projectName}} </span>
            </a></span
          >
          <span class="flex-auto text-right">
            <span></span
            ><span class="Label Label--secondary v-align-middle"
              ><el-tag size="small">{{isDone}}</el-tag></span
            >
          </span>
        </div>
      </div>
      <p class="pinned-item-desc color-fg-muted text-small d-block mt-2 mb-3">
        {{item.projectDetail}}
      </p>
      <p class="mb-0 f6 color-fg-muted">
        <a href="" class="pinned-item-meta Link--muted">
          <svg
            aria-label="person"
            role="img"
            height="16"
            viewBox="0 0 16 16"
            version="1.1"
            width="16"
            data-view-component="true"
            class="octicon octicon-person"
          >
            <path
              d="M4.243 4.757a3.757 3.757 0 1 1 5.851 3.119 6.006 6.006 0 0 1 3.9 5.339.75.75 0 0 1-.715.784H2.721a.75.75 0 0 1-.714-.784 6.006 6.006 0 0 1 3.9-5.34 3.753 3.753 0 0 1-1.664-3.118Z"
            ></path>
          </svg>
          <span class="repo-id">id:{{item.projectDesignerId}}</span>
        </a>
      </p>
    </div>
  </el-card>
</template>

<script>
export default {
  props: ["item"],
  data() {
    return { isDone:"" };
  },
  mounted() {
    if(this.item.projectIsdone == false){
      this.isDone = "未完成"
    }else{
        this.isDone = "已完成"
    }
  },
  methods: {
    handleDetail() {
      this.$store.commit("xzwxzw/setProjectId", this.item.projectId);
      this.$router.push("/preview");
    },
  },
};
</script>
<style scoped>
* {
  box-sizing: border-box;
}
.my-label {
  background: #e1f3d8;
}

.my-content {
  background: #fde2e2;
}
.box-card {
  background: rgb(255, 255, 255);
  padding: 0px 0px 0px;
  margin-bottom: 32px;
}

.box-table {
  padding: 0px 0px 0px;
}

.dashboard-editor-container .chart-wrapper[data-v-1d9b105c] {
  background: #fff;
  padding: 0px 0px 0;
  margin-bottom: 32px;
}

.project-box {
  background-color: var(--color-canvas-default);
  border-color: rgb(208, 215, 222);
  border-radius: var(0.375rem);
  border-style: solid;
  border-width: var(max(1px, 0.0625rem));
  display: flex !important;
  padding: 1rem;
  width: 100% !important;
  box-sizing: border-box;
  background: #fff;
}

.project-box-item {
  display: flex;
  width: 100%;
  flex-direction: column;
  box-sizing: border-box;
  --Layout-sidebar-width: 256px;
}

.project-name {
  display: flex !important;
  align-items: center !important;
  box-sizing: border-box;
  width: 100% !important;
}

.project-name-span {
  position: relative !important;
  box-sizing: border-box;
}

.project-link {
  font-weight: 600 !important;
}

.d-flex {
  display: flex !important;
}
.width-full {
  width: 100% !important;
}
.flex-items-center {
  align-items: center !important;
}
.position-relative {
  position: relative !important;
}
.text-bold {
  font-weight: 600 !important;
}
.min-width-0 {
  min-width: 0 !important;
  color: #0969da;
}

.repo {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans",
    Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  font-size: 14px;
  text-align: center;
  line-height: 1.5;
}

.repo-id {
  text-align: center;
  padding: 5px;
}

.text-right {
  text-align: right !important;
}

.flex-auto {
  flex: auto !important;
}

.Label,
.label {
  display: inline-block;
  line-height: 18px;
  padding: 0 7px;
  white-space: nowrap;
}

.v-align-middle {
  vertical-align: middle !important;
}

.el-card ::v-deep .el-card__body {
  display: flex !important;
  width: 100% !important;
  flex-direction: column !important;
}

.text-small {
  font-size: 12px !important;
  text-align: left;
}

.mb-3 {
  margin-bottom: 16px !important;
}

.mt-2 {
  margin-top: 8px !important;
}

.color-fg-muted {
  color: #656d76;
  text-align: left;
}

.pinned-item-meta {
  display: inline-block;
  font-size: 12px;
  text-align: center;
}

.Link--muted {
  color: #656d76 !important;
  text-decoration: none !important;
}

.Link--muted :hover {
  color: #0969da !important;
  text-decoration: none !important;
}

.text-bold {
  text-decoration: none;
}

.text-bold:hover {
  text-decoration: underline;
}

.octicon {
  display: inline-block;
  overflow: visible !important;
  vertical-align: text-bottom;
  fill: currentColor;
}
</style>