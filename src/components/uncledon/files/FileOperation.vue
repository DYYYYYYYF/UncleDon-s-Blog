<template>
  <div>
    <input type="file" ref="fileInput" @change="handleFileChange" multiple>
    <button @click="uploadFiles" :disabled="!files.length">上传</button>
    <div v-if="progress.visible" class="progress-bar">
      <div :style="{ width: progress.percentage + '%' }"></div>
    </div>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "FileOperationPage",
  data() {
    return {
      files: [],
      message: '',
      progress: {
        visible: false,
        percentage: 0
      }
    };
  },
  methods: {
    handleFileChange(e) {
      this.files = Array.from(e.target.files);
    },
    async uploadFiles() {
      if (!this.files.length) return;

      const formData = new FormData();
      this.files.forEach(file => {
        formData.append('files', file); // 字段名与Drogon后端一致
      });

      try {
        this.progress.visible = true;
        const response = await axios.post('/backend/file/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: progressEvent => {
            this.progress.percentage = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
          }
        });

        this.message = `上传成功: ${response.data.saved_files.join(', ')}`;
        this.$emit('upload-success', response.data);
      } catch (error) {
        this.message = `上传失败: ${error.response?.data || error.message}`;
      } finally {
        setTimeout(() => {
          this.progress.visible = false;
          this.progress.percentage = 0;
          this.files = [];
          this.$refs.fileInput.value = ''; // 清空文件选择
        }, 2000);
      }
    }
  }
};
</script>

<style scoped>
.progress-bar {
  width: 100%;
  height: 5px;
  background: #eee;
  margin: 10px 0;
}
.progress-bar div {
  height: 100%;
  background: #42b983;
  transition: width 0.3s;
}
</style>
