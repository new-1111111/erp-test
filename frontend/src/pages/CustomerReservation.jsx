import SelectAsync from "@/components/SelectAsync";
import { crud } from "@/redux/crud/actions";
import { selectListsByCustomerContact, } from "@/redux/crud/selectors";
import { request } from "@/request";
import { CheckOutlined, CloseCircleOutlined, DeliveredProcedureOutlined, EditOutlined, FundViewOutlined, MinusCircleOutlined, PlusCircleOutlined, } from "@ant-design/icons";
import { Button, Checkbox, Col, Dropdown, Form, Input, Modal, Pagination, Row, Select, Table, Upload, message } from "antd";
import TextArea from "antd/lib/input/TextArea";
import moment from "moment";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditReservationModal from "./EditReservationModal";
import ProductCreationModal from "./ProductCreationModal";
import { sendEmailWithCreation } from "./common";
import PageLoader from '@/components/PageLoader';

const CustomerReservation = ({ parentId: currentCustomerId, isClicked, onIsClickNewReservaChange, customerInfo, setReversationInfo }) => {
    const { id: currentUserId } = JSON.parse(localStorage.auth)
    const entity = 'customerReversation';
    const dispatch = useDispatch();
    const [isEdit, setIsEdit] = useState(false);
    const formRef = useRef(null);
    const handleMenuClick = ({ key }, record) => {
        if (key === `1`) {
            editItem(record)
        } else if (key === `2`) {
            cancelItem(record)
        } else if (key === `3`) {
            deliveredItem(record)
        } else {
            logViewItem(record)
        }
    };
    const _items = [
        {
            label: 'Edit',
            key: 1,
            icon: <EditOutlined />,
        },
        {
            label: 'Cancel',
            key: 2,
            icon: <CloseCircleOutlined />,
        },
        {
            label: 'Delivered',
            key: 3,
            icon: <DeliveredProcedureOutlined />,
        },
        {
            label: 'View Log',
            key: 4,
            icon: <FundViewOutlined />,
        },
    ];
    const Columns = [
        {
            title: 'Id',
            dataIndex: 'reserva_id',
            render: (id, record) => {
                return <label onClick={() => editItem(record)} >R{id}</label>
            }
        },
        {
            title: 'Product',
            dataIndex: ['product_name', `category_name`],
        },
        {
            title: 'Date',
            dataIndex: 'created',
            render: (date) => {
                return moment(new Date(date)).format('DD/MM/YY')
            }
        },
        {
            title: 'Total',
            dataIndex: 'product_price',
            render: (price) => {
                return (parseFloat(price) || 0).toFixed(2)
            }
        },
        {
            title: 'Paid',
            dataIndex: 'paid_amount',
            render: (paid_amount) => {
                return (parseFloat(paid_amount) || 0).toFixed(2)
            }
        },
        {
            title: 'Pending',
            render: (_, obj) => {
                return (parseFloat(obj?.product_price || 0) - parseFloat(obj?.paid_amount || 0)).toFixed(2)
            }
        },
        {
            title: 'Company',
            dataIndex: [`company_name`, `company_name`]
        },
        {
            title: 'Notes',
            dataIndex: 'notes',
        },
        {
            title: 'Status',
            dataIndex: 'is_preventa',
            render: (status, record) => {
                if (record?.status == -1) {
                    return <span className='badge badge-light-danger'>Cancelled</span>
                } else if (record?.status === 2) {
                    return <span className='badge badge-light-warning'>Delivered</span>
                }
                else {
                    if ((status)) {
                        return <span className='badge badge-light-info'>Preventa</span>
                    } else {

                        return <span className='badge badge-light-success'>Active</span>
                    }
                }
            }
        },
        {
            title: 'Actions',
            render: (_, record) => {
                return (
                    <>
                        <Dropdown.Button menu={{ items: _items, onClick: (item) => handleMenuClick(item, record) }}>
                            Action
                        </Dropdown.Button>
                    </>
                )

            }
        },
    ];
    const logColumns = [
        {
            title: 'Date',
            dataIndex: 'created',
            render: (created) => {
                return moment(new Date(created)).format('DD/MM/YY')
            }
        },
        {
            title: 'Description',
            dataIndex: 'description',
        },
        {
            title: 'User',
            dataIndex: [`user_id`, `name`]
        },

    ];

    const cancelItem = (item) => {
        setIsCancelModal(true);
        setCurrentId(item?._id)
    }
    const deliveredItem = (item) => {
        dispatch(crud.update({ entity, id: item?._id, jsonData: { status: 2 } }));
        dispatch(crud.create({ entity: 'logHistory', jsonData: { log_id: item?._id, where_: `reserva`, description: "Delivered", user_id: currentUserId } }))
        setTimeout(() => {
            const jsonData = { parent_id: currentCustomerId }
            dispatch(crud.listByCustomerContact({ entity, jsonData }))

        }, 500);
    }
    const handleCancel = () => {
        if (currentId) {
            const id = currentId;

            const jsonData = { status: -1 }
            dispatch(crud.create({ entity: `logHistory`, jsonData: { description: cancelCommit, log_id: id, where_: "reserva", user_id: currentUserId } }))
            dispatch(crud.update({ entity, id, jsonData }));

            setTimeout(() => {
                const jsonData = { parent_id: currentCustomerId }
                dispatch(crud.listByCustomerContact({ entity, jsonData }))
                setIsCancelModal(false)
            }, [500])
        }
    }
    const [currentId, setCurrentId] = useState('');
    const [isUpdate, setIsUpdate] = useState(false);
    const [parentInfo, setParentInfo] = useState({ name: 33 });
    const [cancelCommit, setCancelCommit] = useState(``);
    const [logHistories, setLogHistories] = useState([]);
    const [customerReservation, setCustomerReservation] = useState([]);
    const [selectedRecord, setSelectedRecord] = useState({});

    const [reserveStatus, setReserveStatus] = useState(false)
    useEffect(() => {
        if (isClicked) editForm();

        (async () => {
            const { result: companyInfo } = await request.list({ entity: 'companyList' });
            form.setFieldsValue({ company_name: companyInfo[0]?._id })
        })()

        setParentInfo(customerInfo);
        return () => {
            onIsClickNewReservaChange(false)
        }
    }, [isClicked, onIsClickNewReservaChange, customerInfo]);

    const editForm = () => {
        setIsEdit(true);
        setIsUpdate(false);
    }
    const editItem = (item) => {
        setIsEditReserva(true);
        setSelectedRecord(item)
        getPaymentHistories(item)
        setCurrentId(item?._id)
        _editForm.setFieldsValue({ ...item, product_name: item.product_name._id, product_type: item.product_type._id, pending_amount: (item.product_price - item.paid_amount) })
    }
    const logViewItem = async (item) => {

        const currentId = item?._id;
        const jsonData = { log_id: currentId, where_: "reserva" }
        const { result: logData } = await request.listById({ entity: "logHistory", jsonData });
        setLogHistories(logData)
        setIsLogHistory(true)
    }
    const handleBankModal = () => {
        setIsEdit(false)
        setIsEditReserva(false)
    }
    const saveData = async (values) => {
        setReserveStatus(true)
        const parentId = currentCustomerId;
        const { reversations: reservations } = values;
        const reservationsWithParentId = reservations.map((obj) => {
            obj.parent_id = parentId;
            obj.user_id = currentUserId;
            obj.is_preventa = obj.is_preventa || false;
            obj.company_name = values?.company_name
            return obj
        });
        const formData = new FormData();
        formData.append('_file', currentFile);
        formData.append('bulkData', JSON.stringify(reservationsWithParentId));
        const preventMailInfo = [], activeMailInfo = [];
        for (var i = 0; i < reservations.length; i++) {
            var obj = { ...reservations[i] }, reserva_obj = reservations[i];
            for (var j = 0; j < productCategories.length; j++) {
                var product_obj = productCategories[j]
                if (reserva_obj?.product_name === product_obj?._id) {
                    obj['product_info'] = product_obj;
                }
            }
            if (obj?.is_preventa) {
                preventMailInfo.push(obj);
            } else {
                activeMailInfo.push(obj);
            }
        }
        // preventMailInfo.length && await sendEmailWithCreation(preventMailInfo, 'preventa', customerInfo);
        // activeMailInfo.length && await sendEmailWithCreation(activeMailInfo, 'active', customerInfo);
        dispatch(crud.upload({ entity, jsonData: formData }));
        setTimeout(() => {
            dispatch(crud.listByCustomerContact({ entity, jsonData: { parent_id: parentId } }));
            setIsEdit(false)
            setReserveStatus(false)
        }, 500);

    }
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const [paginations, setPaginations] = useState({ current: 0, count: 0, total: 0, page: 0 });


    useEffect(() => {
        (async () => {
            const { result: items, pagination } = await request.listById({ entity, jsonData: { parent_id: currentCustomerId } });
            const { result } = await request.list({ entity: `logHistory` });
            for (var i = 0; i < items.length; i++) {
                items[i][`reservation_id`] = `R${i + 1}`
                for (var j = 0; j < result.length; j++) {
                    if (items[i].status === -1 && items[i]._id === result[j].log_id) {
                        console.log(items[i].status === -1, items[i]._id === result[j].log_id);
                        items[i][`notes`] = result[j][`description`];
                    }
                }
            }
            items.sort((a, b) => b.reserva_id - a.reserva_id)
            setReversationInfo([...items]);
            setCustomerReservation([...items]);
            setPaginations(pagination);
        })()
    }, []);
    const [form] = Form.useForm();
    const [_editForm] = Form.useForm();
    const [totalPaidAmount, setTotalPaidAmount] = useState(0);
    const [totalAllAmount, setTotalAllAmount] = useState(0);
    const [totalPredienteAmount, setTotalPredienteAmount] = useState(0);
    const [isCancelModal, setIsCancelModal] = useState(false)
    const [isLogHistory, setIsLogHistory] = useState(false);
    const [fileList, setFileList] = useState([
    ]);
    const [productCategories, setProductCategories] = useState([]);
    const [originProductCategories, setOriginProductCategories] = useState([]);

    const [newCategory, setNewCategory] = useState(``);
    const [isEditReserva, setIsEditReserva] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [productObj, setProductObj] = useState(false);
    const [currentFile, setCurrentFile] = useState();
    const onChange = ({ fileList: newFileList }) => {
        setCurrentFile(newFileList[0]?.originFileObj)
        setFileList(newFileList);
    };
    const onPreview = async (file) => {
        console.log(file, `1111`);
        let src = file.url;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };
    const getProductCategories = async () => {
        const { result } = await request.list({ entity: `productCategories` });
        setOriginProductCategories(result);
        setProductCategories(result);

    };
    const saveCategory = async (index) => {
        if (!(form.getFieldsValue()?.reversations && form.getFieldsValue()?.reversations[index].product_type)) {
            return message.warning("Please select Type.")
        }
        if (newCategory) {
            const { reversations } = form.getFieldsValue();
            setProductObj({ ...reversations[index], category_name: newCategory })
            setIsModalVisible(true)
        }

    }
    const handleSearch = (values) => {
        setNewCategory(values)
    }
    const [paymentHistories, setPaymentHistories] = useState([])
    const getPaymentHistories = async (item) => {
        const { result } = await request.listById({ entity: 'paymentHistory', jsonData: { reserva_id: item?._id } });
        setPaymentHistories(result || [])
    }


    useEffect(() => {
        const id = currentCustomerId;
        const jsonData = { parent_id: id }
        dispatch(crud.listByCustomerContact({ entity, jsonData }));
        getProductCategories();
        document.title = "CustomerDetails"
    }, []);
    const handleProductType = (value) => {
        const productList = originProductCategories.filter((obj) => {
            if (obj?.product_type?._id === value) {
                return obj;
            }
        })
        console.log(productList, `productList`);
        setProductCategories(productList);
        // _editForm.setFieldsValue({ product_name: productList[0]?._id })
    }
    const handlePriceChange = (newValue, index) => {
        var formData = form.getFieldsValue();
        if (formData) {
            formData['reversations'][index][`total_price`] = newValue;
            formData['reversations'][index][`prediente`] = (newValue || 0) - (formData['reversations'][index][`paid_amount`] || 0);
            const reversations = formData?.reversations;

            console.log(reversations, '222');
            var total_paid_amount = 0, total_amount = 0, tota_prediente = 0;
            for (var i = 0; reversations && i < reversations.length; i++) {
                var obj = reversations[i];
                total_paid_amount += parseFloat(obj?.paid_amount || 0);
                total_amount += parseFloat(obj?.total_price || 0);
                tota_prediente += parseFloat(obj?.prediente || 0)
            }
            setTotalPaidAmount(total_paid_amount || 0)
            setTotalAllAmount(total_amount || 0)
            setTotalPredienteAmount(tota_prediente || 0)
            form.setFieldsValue(formData);
        }
    }
    const handlePaidChange = (newValue, index) => {
        var formData = form.getFieldsValue();
        if (formData) {
            formData['reversations'][index][`prediente`] = formData['reversations'][index][`product_price`] - newValue;

            const reversations = formData[`reversations`];
            var total_paid_amount = 0, total_amount = 0, tota_prediente = 0;
            for (var i = 0; reversations && i < reversations.length; i++) {
                var obj = reversations[i];
                total_paid_amount += parseFloat(obj?.paid_amount || 0);
                total_amount += parseFloat(obj?.total_price || 0);
                tota_prediente += parseFloat(obj?.prediente || 0)
            }
            setTotalPaidAmount(total_paid_amount || 0)
            setTotalAllAmount(total_amount || 0)
            setTotalPredienteAmount(tota_prediente || 0)
            form.setFieldsValue(formData)
        }
    }
    const [checked, setChecked] = useState(false);
    const Footer = useCallback(() => {
        const pages = paginations
        const { current, count, total, page } = pages
        const currentPage = current || page;
        const totalSize = total || count;
        return (
            <>
                Showing {customerReservation.length ? ((currentPage - 1) * 10 + 1) : 0} to {currentPage * 10 > (totalSize) ? (totalSize) : currentPage * 10} of {totalSize} entries
            </>
        );
    }, [paginations, customerReservation])
    const paginationChange = useCallback((page) => {
        setPaginations({ ...page, })
    }, [])
    const inputRef = useRef(null);
    const [imageUrl, setImageUrl] = useState('')
    const handlePaste = (event) => {
        const items = (event.clipboardData || event.originalEvent.clipboardData).items;
        setCurrentFile(event.clipboardData.files[0]);
        for (const item of items) {
            if (item.type.indexOf('image') !== -1) {
                const blob = item.getAsFile();

                // You can use the blob data to display the image or upload it to your server
                // For simplicity, we are displaying the image directly in the browser

                const reader = new FileReader();
                reader.onload = (e) => {
                    console.log(e.target)
                    const imageUrl = e.target.result;
                    setImageUrl(imageUrl);
                    // Display the image (you can also upload it to a server at this point)
                    // inputRef.current.value = imageUrl;
                };
                reader.readAsDataURL(blob);
            }
        }
    }

    return (

        <div className="whiteBox shadow">

            <Modal title="New Reserve" visible={isEdit} onCancel={handleBankModal} footer={null} width={1000}>
                {
                    !reserveStatus ? <Form
                        className="ant-advanced-search-form"
                        form={form}
                        ref={formRef}
                        name="basic"
                        layout="vertical"
                        wrapperCol={{
                            span: 16,
                        }}
                        onFinish={saveData}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        initialValues={{
                            name: parentInfo?.name,
                            email: parentInfo?.email,
                            iguser: parentInfo?.iguser
                        }}
                    >
                        <Row>
                            <Col span={6}>
                                <Form.Item
                                    name={'name'}
                                    label="Name"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input disabled />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    name={'email'}
                                    label="Email"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input disabled />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    name={'iguser'}
                                    label="IG"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input disabled />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    name={'company_name'}
                                    label="Company Name"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <SelectAsync entity={`companyList`} displayLabels={[`company_name`]} />
                                </Form.Item>
                            </Col>
                            {/* <Col span={4}>
                            <Upload
                                listType="picture-card"
                                fileList={fileList}
                                onChange={onChange}
                                onPreview={onPreview}
                            >
                                {fileList.length < 1 && '+ Upload'}
                            </Upload>
                        </Col> */}
                        </Row>
                        <div className="opacity-25 bg-dark rounded h-1px w-100 mb-5 mt-5" style={{ "backgroundColor": "#13ed05" }}></div>
                        <Row>
                            <Form.List name="reversations" initialValue={[{}]}>
                                {(fields, { add, remove }) => (
                                    <>
                                        {fields.map(({ key, name, ...restField }, index) => (
                                            <Row key={key} style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }} >
                                                <Form.Item
                                                    style={{ width: '20%' }}
                                                    label={!index && `Type`}
                                                    name={[name, `product_type`]}
                                                    rules={[
                                                        {
                                                            required: true,
                                                        },
                                                    ]}
                                                >
                                                    <SelectAsync entity={'productTypes'} displayLabels={['product_name']} onChange={handleProductType} />
                                                </Form.Item>
                                                <Form.Item
                                                    style={{ width: '18%' }}

                                                    {...restField}
                                                    wrapperCol={24}
                                                    name={[name, `product_name`]}
                                                    label={!index && "Product"}
                                                    rules={[
                                                        {
                                                            required: true,
                                                        },
                                                    ]}

                                                >
                                                    <Select
                                                        onSearch={handleSearch}
                                                        showSearch
                                                        notFoundContent={<Button type="primary" onClick={(e) => saveCategory(index)}>
                                                            <CheckOutlined />
                                                        </Button>}
                                                        optionFilterProp="children"
                                                        onChange={(value) => {
                                                            const { category_name, product_price } = productCategories.find((obj) => {
                                                                if (obj._id === value) {
                                                                    return obj
                                                                }
                                                            })
                                                            var formData = form.getFieldsValue();
                                                            if (formData) {
                                                                formData['reversations'][index][`payment_name`] = category_name;
                                                                formData['reversations'][index][`product_price`] = product_price;
                                                                form.setFieldsValue(formData)
                                                                handlePriceChange(product_price, index);
                                                                handlePaidChange(formData['reversations'][index][`paid_amount`], index)
                                                            }
                                                        }}
                                                    >
                                                        {[...productCategories].map((optionField) => (
                                                            <Select.Option
                                                                key={optionField[`_id`]}
                                                                value={optionField[`_id`]}
                                                            >
                                                                {optionField[`category_name`]}
                                                            </Select.Option>
                                                        ))}
                                                    </Select>



                                                </Form.Item>
                                                <Form.Item
                                                    style={{ width: '20%' }}

                                                    {...restField}
                                                    name={[name, `product_price`]}
                                                    label={!index && "Price"}
                                                    rules={[
                                                        {
                                                            required: true,
                                                        },
                                                    ]}
                                                    onChange={(e) => {
                                                        const newValue = e.target.value;
                                                        handlePriceChange(newValue, index)

                                                    }}
                                                >
                                                    <Input prefix="$" />
                                                </Form.Item>
                                                <Form.Item
                                                    style={{ width: '10%' }}
                                                    {...restField}
                                                    name={[name, `is_preventa`]}
                                                    label={!index && "Preventa"}
                                                    valuePropName="checked"
                                                >
                                                    <Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)}>Yes</Checkbox>
                                                </Form.Item>
                                                <Form.Item
                                                    style={{ width: '20%' }}

                                                    {...restField}
                                                    name={[name, `notes`]}
                                                    label={!index && "Notes"}
                                                >
                                                    <Input />
                                                </Form.Item>
                                                <Form.Item
                                                    style={{ width: '10%' }}

                                                    label={!index && `action`}
                                                >
                                                    <MinusCircleOutlined onClick={() => {
                                                        remove(name)
                                                        const formData = form?.getFieldsValue();
                                                        if (formData) {
                                                            const reversations = formData?.reversations;
                                                            var total_paid_amount = 0, total_amount = 0, tota_prediente = 0;
                                                            for (var i = 0; reversations && i < reversations.length; i++) {
                                                                var obj = reversations[i];
                                                                total_paid_amount += parseFloat(obj?.paid_amount || 0);
                                                                total_amount += parseFloat(obj?.total_price || 0);
                                                                tota_prediente += parseFloat(obj?.prediente || 0)
                                                            }
                                                            setTotalPaidAmount(total_paid_amount || 0)
                                                            setTotalAllAmount(total_amount || 0)
                                                            setTotalPredienteAmount(tota_prediente || 0)
                                                        };
                                                    }} />
                                                    <PlusCircleOutlined onClick={() => add()} />
                                                </Form.Item>
                                            </Row>
                                        ))}
                                        <div className="opacity-25 bg-dark rounded h-1px w-100 mb-5 mt-5" style={{ "backgroundColor": "#13ed05" }}></div>
                                        <Row gutter={24} style={{ display: 'flex', justifyContent: 'space-around', width: '80%' }}>
                                            {fields.map(({ key, name, ...restField }, index) => (
                                                <>
                                                    <Col span={6}>

                                                        <Form.Item
                                                            {...restField}
                                                            wrapperCol={24}
                                                            name={[name, 'payment_name']}
                                                            label={!index && "Product"}
                                                        >
                                                            <label>{form?.getFieldsValue()?.reversations && form?.getFieldsValue()?.reversations[index]?.payment_name}</label>
                                                        </Form.Item>
                                                    </Col>
                                                    <Col span={6}>

                                                        <Form.Item
                                                            {...restField}
                                                            name={[name, 'paid_amount']}
                                                            label={!index && "Paid"}
                                                            onChange={(e) => {
                                                                const newValue = e.target.value;
                                                                handlePaidChange(newValue, index)
                                                            }}
                                                            rules={[
                                                                {
                                                                    validator: ({ field }, paid_amount,) => {
                                                                        const formValues = form.getFieldsValue();
                                                                        const total_price = formValues?.reversations[index]?.total_price;
                                                                        console.log(typeof total_price, 'total_price,paid_amount', typeof paid_amount);
                                                                        if (parseFloat(paid_amount || 0) > parseFloat(total_price || 0)) {
                                                                            return Promise.reject('Paid amount cannot be greater than total price');

                                                                        }
                                                                        return Promise.resolve();
                                                                    },
                                                                }
                                                            ]}
                                                        >
                                                            <Input />
                                                        </Form.Item>
                                                    </Col>
                                                    <Col span={6}>

                                                        <Form.Item
                                                            {...restField}
                                                            name={[name, 'total_amount']}
                                                            label={!index && "Total"}
                                                        >
                                                            <label>${form.getFieldsValue()?.reversations && (form.getFieldsValue()?.reversations[index]?.total_price || 0)}</label>
                                                        </Form.Item>
                                                    </Col>
                                                    <Col span={6}>

                                                        <Form.Item
                                                            {...restField}
                                                            name={[name, 'prediente']}
                                                            label={!index && "Prediente"}
                                                        >
                                                            <label>${form.getFieldsValue()?.reversations && (form.getFieldsValue()?.reversations[index]?.prediente || 0)}</label>
                                                        </Form.Item>
                                                    </Col>
                                                </>
                                            ))}
                                        </Row>
                                        <Row style={{ width: `20%`, height: '100%' }}>
                                            <input style={{ width: '100%' }} type="text" ref={inputRef} placeholder="Click here and Paste" onPaste={handlePaste} />
                                            <img src={imageUrl} width="100%" height='100%' alt='' />
                                        </Row>
                                        <div className="opacity-25 bg-dark rounded h-1px w-100 mb-5 mt-5" style={{ "backgroundColor": "#13ed05" }}></div>
                                    </>
                                )}
                            </Form.List>
                        </Row>
                        <Row style={{ display: `flex`, justifyContent: 'space-around', width: '80%' }}>
                            <Col span={6}>
                                <h3>Total Payment</h3>
                            </Col>
                            <Col span={6}>
                                <h3>${totalPaidAmount}</h3>
                            </Col>
                            <Col span={6}>
                                <h3>${totalAllAmount}</h3>
                            </Col>
                            <Col span={6}>
                                <h3>${totalPredienteAmount}</h3>
                            </Col>
                        </Row>
                        <div className="opacity-25 bg-dark rounded h-1px w-100 mb-5 mt-5" style={{ "backgroundColor": "#13ed05" }}></div>
                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            {
                                isUpdate ?
                                    <Button type="primary" htmlType="submit">
                                        Update
                                    </Button>
                                    : <Button type="primary" htmlType="submit">
                                        Save
                                    </Button>

                            }

                            <Button type="ghost" onClick={handleBankModal}>
                                cancel
                            </Button>
                        </Form.Item>
                    </Form> : <PageLoader />
                }

            </Modal>
            <Modal title={`Please input your comment before cancel.`} onOk={handleCancel} onCancel={() => setIsCancelModal(false)} visible={isCancelModal}>
                <Form>
                    <Form.Item>
                        <TextArea onChange={(e) => setCancelCommit(e?.target?.innerHTML)} />
                    </Form.Item>
                </Form>
            </Modal>
            <Modal title={`Log History`} footer={null} onCancel={() => setIsLogHistory(false)} visible={isLogHistory}>
                <Table
                    bordered
                    rowKey={(item) => item._id}
                    key={(item) => item._id}
                    dataSource={logHistories || []}
                    columns={logColumns}
                    rowClassName="editable-row"


                />
            </Modal>
            <Table
                bordered
                rowKey={(item) => item._id}
                key={(item) => item._id}
                dataSource={customerReservation || []}
                columns={Columns}
                rowClassName="editable-row"
                footer={Footer}
                onChange={paginationChange}
            />
            <EditReservationModal isEditReserva={isEditReserva} setIsEditReserva={(value) => { setIsEditReserva(value) }} customerInfo={customerInfo} currentItem={selectedRecord} currentCustomerId={currentCustomerId} />
            <ProductCreationModal productInfo={productObj} thirdParty={true} isModalVisible={isModalVisible} setIsModalVisible={(value) => {
                setIsModalVisible(value);
                getProductCategories();
                form.resetFields([`product_type`, `product_name`])
            }} />

        </div>
    );
}
export default CustomerReservation;