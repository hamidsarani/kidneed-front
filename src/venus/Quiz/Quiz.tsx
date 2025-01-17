import { strapi } from '@kidneed/services';
import { width } from '@mui/system';
import { Form, message } from 'antd';
import Text from 'antd/lib/typography/Text';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { PrimaryButton } from 'venus/PrimaryButton/PrimaryButton';
import { ContentWrapper } from '../ContentWrapper/ContentWrapper';
import { QuestionSlider } from '../QuestionSlider/QuestionSlider';
import styles from "./Quiz.module.css";

export const Quiz: React.FC<{way?: string, childId?: number}> = (props) => {

    const [data, setData] = useState<Array<any>>([])

    const router = useRouter()

    useEffect(() => {
        strapi
            .request<any>("get", `/venus/question/?category=${props.way}&child=${props.childId}`, {
                data: {
                    data: {
                        category: props.way,
                        child: props.childId
                    },
                },
            })
            .then((response) => {
                setData(response);
            })
            .catch((error) => {
                console.log(error);
                message.error("خطایی رخ داده است");
            });
    }, [])

    return (
        <ContentWrapper
            title="پرسشنامه"
            contentStyle={{display: 'flex', flexDirection: "column", alignItems: "center", gap: "20px"}}
        >
            <Text style={{ fontSize: "16px" }}>لطفا موارد زیر را در مورد فرزندتان مشخص نمایید</Text>
            <Form layout="vertical" >
                <div className={styles.questionsWrapper}>
                    {data.map((item: any) => {
                        return <QuestionSlider key={item.id} label={item.title} name={`a-${item.id}`} />
                    })}
                </div>
                <PrimaryButton style={{marginTop: "20px", width: "180px"}} onClick={() => router.push("/parent/dashboard")}>تایید</PrimaryButton>
            </Form>
        </ContentWrapper>
    )
}
