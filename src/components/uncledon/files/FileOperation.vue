<template>
  <div class="file-manager">
  <!-- 文件列表表格 -->
  <table class="file-table">
    <thead>
      <tr>
        <th>文件名</th>
        <th>大小</th>
        <!-- <th>修改日期</th> -->
        <th>操作</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="file in files" :key="file.name">
        <td>{{ file.name }}</td>
        <td>{{ formatFileSize(file.size) }}</td>
        <!-- <td>{{ formatDate(file.last_modified) }}</td> -->
        <td class="actions">
          <button @click="downloadFile(file.name)" class="btn-download">下载</button>
          <button @click="deleteFile(file.name)" class="btn-preview">删除</button>
        </td>
      </tr>
    </tbody>
  </table>

  <!-- 上传区域 -->
  <div class="upload-section">
    <input 
      type="file" 
      ref="fileInput" 
      @change="handleFileChange" 
      multiple
      class="file-input"
    >
    <button 
      @click="uploadFiles" 
      :disabled="!files.length" 
      class="btn-upload"
    >
      上传
    </button>
    
    <!-- 进度条 -->
    <div v-if="progress.visible" class="progress-container">
      <div class="progress-bar" :style="{ width: progress.percentage + '%' }"></div>
      <span class="progress-text">{{ progress.percentage }}%</span>
    </div>
    
    <p v-if="message" class="message">{{ message }}</p>
  </div>
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
  async created() {
    const token = localStorage.getItem('jwt_token');
    const id = localStorage.getItem('user_id');

    try {
         const res = await axios.post('/backend/file/acquire_file_list',
            { 'user_id': id },
            {
              headers: {
                'Authorization': `Bearer ${token}` 
              }
            }
         );

        this.files = res.data.files;
    } catch (err) {
        if (err.response?.status === 401) {
            // Token无效，跳转到登录
            // window.location.href = '/login';
        }
        throw err;
    }
  },
  methods: {
      formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
      },
      formatDate(timestamp) {
        return new Date(timestamp).toLocaleString();
      },
      handleFileChange(e) {
        this.files = Array.from(e.target.files);
      },
      async deleteFile(filename){
        if (!filename.trim()) return;

        const form = document.createElement('form');
        form.method = 'POST';
        form.action = '/backend/file/delete';
        form.style.display = 'none';
        
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = 'file';
        input.value = filename;
        
        form.appendChild(input);
        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);
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

        const res = await axios.post('/backend/file/acquire_file_list');
        this.files = res.data.files;
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
    },
    async downloadFile(filename) {
        if (!filename.trim()) return;

        this.message = '开始下载...';
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = '/backend/file/download';
        form.style.display = 'none';
        
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = 'file';
        input.value = filename;
        
        form.appendChild(input);
        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);
    }
    },
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

.file-manager {
  max-width: 1000px;
  height: 93vh;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.file-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.file-table th, .file-table td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.file-table th {
  background-color: #f8f9fa;
  font-weight: 600;
}

.file-table tr:hover {
  background-color: #f5f5f5;
}

.actions {
  display: flex;
  gap: 8px;
}

.btn-preview, .btn-download {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.btn-preview {
  background-color: #4CAF50;
  color: white;
}

.btn-download {
  background-color: #2196F3;
  color: white;
}

.btn-preview:hover {
  background-color: #45a049;
}

.btn-download:hover {
  background-color: #0b7dda;
}

.upload-section {
  margin-top: 30px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 4px;
}

.file-input {
  display: block;
  margin-bottom: 15px;
}

.btn-upload {
  padding: 10px 20px;
  background-color: #ff9800;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.btn-upload:hover {
  background-color: #e68a00;
}

.btn-upload:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.progress-container {
  margin-top: 15px;
  height: 20px;
  background-color: #e9ecef;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background-color: #4CAF50;
  transition: width 0.3s ease;
}

.progress-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #495057;
  font-size: 12px;
}

.message {
  margin-top: 15px;
  padding: 10px;
  border-radius: 4px;
}

.message.success {
  background-color: #d4edda;
  color: #155724;
}

.message.error {
  background-color: #f8d7da;
  color: #721c24;
}
</style>
