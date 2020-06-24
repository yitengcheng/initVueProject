<template>
  <div>
    <el-button
      v-if="!user"
      class="el-icon-user-solid button"
      type="text"
      @click="modelVisible = true"
    >登录</el-button>
    <div class="user" v-else>
      <div class="user">
        <el-button type="text" @click="changePwd" class="userName">{{user.name}}</el-button>
      </div>
      <el-button
        @click="logoutVisible = true"
        size="mini"
        circle
        icon="el-icon-switch-button"
        class="logout"
      ></el-button>
    </div>
    <showModel
      title="登录"
      :dialogVisible="modelVisible"
      @close="closeModel"
      @doCancel="closeModel"
      @doConfirm="doConfirm"
    >
      <div slot="content">
        <el-form :model="userInfo" ref="login" class="loginWrapper" :rules="rules">
          <el-form-item label="用户名" label-width="70px" class="loginItem" prop="name">
            <el-input @change="onChangeName" v-model="userInfo.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" label-width="70px" class="loginItem" prop="password">
            <el-input
              @change="onChangePassword"
              show-password
              v-model="userInfo.password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
    </showModel>
    <showModel
      title="提示"
      :dialogVisible="logoutVisible"
      @close="closeModel"
      @doCancel="closeModel"
      @doConfirm="logout"
    >
      <div slot="content">
        <p>是否确认退出登录</p>
      </div>
    </showModel>
    <showModel
      title="修改密码"
      :dialogVisible="showChangePassWord"
      @close="closeModel(true)"
      @doCancel="closeModel(true)"
      @doConfirm="changePassWord"
    >
      <div slot="content">
        <el-form
          :model="formpassword"
          ref="formpassword"
          class="formpassword"
          :rules="pwdRules"
          @onChange="onChange"
        >
          <FormInput
            label="旧密码"
            type="password"
            :form="formpassword"
            value="oldPassword"
            maxlength="20"
            @onChange="onChange"
          />
          <FormInput
            label="新密码"
            type="password"
            :form="formpassword"
            value="newPassword"
            maxlength="20"
            @onChange="onChange"
          />
          <FormInput
            label="重复新密码"
            type="password"
            :form="formpassword"
            value="continuePassword"
            maxlength="20"
            @onChange="onChange"
          />
        </el-form>
      </div>
    </showModel>
    <showModel
      title="信息公告"
      :dialogVisible="messageVisible"
      @close="closeModel(true)"
      @doConfirm="closeModel(true)"
      confirm="关闭"
      :hiddenCancel="true"
    >
      <div slot="content" class="class-info">
        <h1 class="class-title">{{information.title}}</h1>
        <p class="class-desc">
          <span class="class-space"></span>
          {{information.desc}}
        </p>
        <div class="class-author">{{information.author}}</div>
        <div class="class-createTime">{{information.createTime}}</div>
      </div>
    </showModel>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import FormInput from '../components/form/formInput';
import showModel from './showModel';
export default {
    components: { showModel, FormInput },
    data () {
        let validatorPassword = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入再次输入新密码'));
            } else if (this.formpassword.newPassword !== value) {
                callback(new Error('你两次输入的新密码不一致'));
            } else {
                callback();
            }
        };
        return {
            messageVisible: false,
            showChangePassWord: false,
            modelVisible: false,
            logoutVisible: false,
            formpassword: {
                oldPassword: '',
                newPassword: '',
                continuePassword: ''
            },
            pwdRules: {
                oldPassword: [
                    { required: true, message: '请输旧密码', trigger: 'blur' }
                ],
                newPassword: [
                    { required: true, message: '请输新密码', trigger: 'blur' }
                ],
                continuePassword: [
                    { required: true, validator: validatorPassword, trigger: 'blur' }
                ]
            },
            userInfo: {
                name: '',
                password: ''
            },
            information: {
                title: '',
                desc: '',
                createTime: '',
                author: ''
            },
            name: '',
            password: '',
            rules: {
                name: [
                    { required: true, message: '请输入用户名称', trigger: 'blur' },
                    { min: 3, max: 16, message: '长度在 3 到 16 位', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 3, max: 16, message: '长度在 3 到 16 位', trigger: 'blur' }
                ]
            }
        };
    },
    computed: {
        ...mapState({
            user: state => state.user.user
        })
    },
    methods: {
        ...mapMutations('user', ['updateUser']),
        closeModel (flag) {
            this.modelVisible = false;
            this.logoutVisible = false;
            this.modifyVisible = false;
            this.messageVisible = false;
            this.showChangePassWord = false;
            this.$refs.login && this.$refs.login.resetFields();
            this.$refs.formpassword && this.$refs.formpassword.resetFields();
        },
        onChange (value, formType) {
            this.formpassword[formType] = value;
        },
        changePwd () {
            this.showChangePassWord = true;
        },
        changePassWord () {
            this.$refs.formpassword.validate(valid => {
                if (valid) {
                    this.$http
                        .post('/api/modifyPassword', {
                            userId: this.user._id,
                            newPassword: this.formpassword.newPassword,
                            oldPassword: this.formpassword.oldPassword
                        })
                        .then(res => {
                            let { success, msg } = res;
                            if (success) {
                                this.$alert('修改成功，请重新登录');
                                this.updateUser('');
                                this.closeModel();
                                this.userInfo = {
                                    name: '',
                                    password: ''
                                };
                                this.name = '';
                                this.password = '';
                                this.$router.replace({
                                    path: '/'
                                });
                            } else {
                                this.$alert(msg);
                            }
                        });
                } else {
                    this.$alert('请认真核对信息');
                }
            });
        },
        onChangeName () {
            this.name = this.userInfo.name;
        },
        onChangePassword () {
            this.password = this.userInfo.password;
        },
        doConfirm () {
            this.closeModel();
            this.$http
                .post('/api/login', {
                    userName: this.name,
                    password: this.password
                })
                .then(res => {
                    let { success, msg, user } = res;
                    if (success) {
                        this.updateUser(user);
                        this.getNewInformation();
                    } else {
                        this.$alert(msg);
                    }
                });
        },
        logout () {
            this.updateUser('');
            this.closeModel();
            this.userInfo = {
                name: '',
                password: ''
            };
            this.name = '';
            this.password = '';
            this.$router.replace({
                path: '/'
            });
        },
        getNewInformation () {
            this.$http.post('/api/getNewInformation').then(res => {
                let { success, msg, information } = res;
                if (success) {
                    this.information = information;
                    this.messageVisible = true;
                } else {
                    this.$alert(msg);
                }
            });
        }
    }
};
</script>
<style lang='scss' scoped>
.button {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  line-height: 20px;
  color: #fff;
}
.user {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}
.head {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin-bottom: 10px;
}
.userName {
  color: #409eff;
  margin-bottom: 10px;
  font-size: 14px;
}
.loginWrapper {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.loginItem {
  width: 250px;
}
.logout {
  background-color: rgba(245, 108, 108, 1);
  color: #fff;
  border-color: rgba(0, 0, 0, 0);
}
.modify {
  display: flex;
  font-size: 12px;
  justify-content: flex-end;
  padding-right: 180px;
  color: #666;
}
.class-info {
  width: 700px;
}
.class-title {
  font-weight: 900;
  font-size: 20px;
  margin-bottom: 40px;
  text-align: center;
}
.class-space {
  margin-left: 31px;
}
.class-desc {
  font-weight: 500;
  font-size: 16px;
  margin-bottom: 40px;
}
.class-author {
  font-weight: 500;
  font-size: 16px;
  margin-bottom: 5px;
  text-align: end;
  margin-right: 12px;
}
.class-createTime {
  font-weight: 500;
  font-size: 16px;
  text-align: end;
  margin-right: 12px;
}
</style>
