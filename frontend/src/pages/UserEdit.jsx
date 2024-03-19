import { request } from "@/request";

const { crud } = require("@/redux/crud/actions");
const { Modal, Form, Input, Button } = require("antd");
const { useForm } = require("antd/lib/form/Form");
const { default: TextArea } = require("antd/lib/input/TextArea");
const { useRef, useState, useEffect } = require("react");
const { useDispatch } = require("react-redux");
const { useHistory } = require("react-router-dom/cjs/react-router-dom.min");

const UserEdit = ({ }) => {
    const dispatch = useDispatch();
    const entity = 'admin'
    const history = useHistory();
    const formRef = useRef(null);
    const [customerForm] = useForm();
    const [currentId, setCurrentId] = useState('');
    const [userData, setUserData] = useState([]);
    const { id: id } = JSON.parse(localStorage?.auth)
    const onFinish = async (values) => {
        const id = currentId;
        const { result: response } = await (request.update({ entity, id, jsonData: { ...values } }));
        customerForm.resetFields();

        history.push(`/customer/admin`)
        dispatch(crud.listByCustomer({ entity, jsonData: { _id: currentId } }));
    };
    const handleCustomerModal = () => {
        customerForm.resetFields();

    }
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    useEffect(async () => {
        const { id: id } = JSON.parse(localStorage?.auth)
        setCurrentId(id)
        const userData = await (request.list({ entity }));
        const filteredUser = userData.result.filter(user => {
            return user._id == id
        })
        setUserData(filteredUser)
        customerForm.resetFields();
    }, [])
    return (
        <div className="mt-6">
            <Form
                ref={formRef}
                form={customerForm}
                name="basic"
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 8,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your name!',
                        },
                    ]}
                >
                    <Input defaultValue={userData[0]?.name} />
                </Form.Item>


                {/* <Form.Item
                    name="phone"
                    label="Phone Number"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your phone!',
                        },
                    ]}

                >
                    <Input type='number' defaultValue={userData[0]?.name} />
                </Form.Item>

                <Form.Item
                    name="notes"
                    label="Notes"
                >
                    <TextArea />
                </Form.Item>
                <Form.Item
                    name="address"
                    label="Address"
                >
                    <Input />
                </Form.Item> */}
                <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', }}>
                    <Form.Item
                        wrapperCol={{
                            offset: 6,
                            span: 8,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Save
                        </Button>
                        <Button type="ghost" onClick={handleCustomerModal}>
                            cancel
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </div>
    );
}
export default UserEdit;
