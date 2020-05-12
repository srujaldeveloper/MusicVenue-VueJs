import { mount, createLocalVue } from '@vue/test-utils';
import Vuelidate from 'vuelidate'
import Login from '../admin/Login/Login'; // name of your Vue component

const localVue = createLocalVue();
localVue.use(Vuelidate);

describe('Login', () => {
    let wrapper = mount(Login, {
        localVue
    });

    it('check email, password are required fields with invalid data', async () => {
        wrapper.setData({
            loginModel: {
                sEmail: undefined,
                sPassword: undefined
            }
        });

        wrapper.find("form").trigger("submit.prevent")
        await wrapper.vm.$nextTick();

        expect(wrapper.vm.$v.$invalid).toBe(true);
    })

    it('check valid email address with invalid email', async () => {
        wrapper.setData({
            loginModel: {
                sEmail: 'any',
                sPassword: undefined
            }
        });

        wrapper.find("form").trigger("submit.prevent")
        await wrapper.vm.$nextTick();

        expect(wrapper.vm.$v.loginModel.sEmail.$error).toBe(true);
    });

    it('check password is required with invalid password', async () => {
        wrapper.setData({
            loginModel: {
                sEmail: 'example@gmail.com',
                sPassword: undefined
            }
        });

        wrapper.find("form").trigger("submit.prevent")
        await wrapper.vm.$nextTick();

        expect(wrapper.vm.$v.loginModel.sPassword.$error).toBe(true);
    });
});