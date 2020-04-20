<template>
    <div id="login" class="login_container">
        <div class="login_box">
            <div class="avatar_box">
                <img src="../assets/logo.png" alt="">
            </div>

            <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" class="login_form" label-width="70px">
                <el-form-item label="账号：" prop="username">
                    <el-input v-model="loginForm.username" prefix-icon="el-icon-user-solid"></el-input>
                </el-form-item>
                <el-form-item label="密码：" prop="password">
                    <el-input type="password" v-model="loginForm.password" prefix-icon="el-icon-s-goods"></el-input>
                </el-form-item>
                <el-form-item class="btns">
                    <el-button type="primary" @click="login">确认</el-button>
                    <el-button type="info" @click="resetLoginForm">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                loginForm: {
                    username: 'admin',
                    password: '123456'
                },
                // 验证规则
                loginFormRules: {
                    username: [
                        { required: true, message: '请输入登录账号', trigger: 'blur' },
                        { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入登录密码', trigger: 'blur' },
                        { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            login() {
                // 表单验证
                this.$refs.loginFormRef.validate(async (valid) => {
                    if(!valid) return;
                    const result = await this.$http.post('login', this.loginForm);
                    const {data: res} = result;
                    // console.log(res);
                    if(res.meta.status != 200) {
                        this.$message.error('登录失败！')
                    } else {
                        this.$message.success('登录成功！')
                        // 保存taken到客户端的sessionstoryrage
                        window.sessionStorage.setItem('token', res.data.token);
                        this.$router.push('/home');
                    }
                })
            },
            resetLoginForm() {
                // 重置表单
                this.$refs.loginFormRef.resetFields();
            }
        }
    }
</script>

<style lang="less" scoped>
    .login_container {
        background-color: #2b4b6b;
        height: 100%;
    }

    .login_box {
        height: 300px;
        width: 450px;
        background-color: #fff;
        border-radius: 3px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);

        .avatar_box {
            height: 130px;
            width: 130px;
            border: 1px solid #eeeeee;
            border-radius: 50%;
            padding: 10px;
            box-shadow: 0 0 10px #eee;
            position: absolute;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: #fff;

            img {
                height: 100%;
                width: 100%;
                border-radius: 50%;
                background-color: #eee;
            }
        }
    }

    .btns {
        display: flex;
        justify-content: flex-end;
    }

    .login_form {
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 0 10px;
        box-sizing: border-box;
    }
</style>