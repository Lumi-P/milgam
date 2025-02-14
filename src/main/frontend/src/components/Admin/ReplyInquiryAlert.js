import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, Typography, DialogTitle, Button, TextField, Divider, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/system';
import { useForm } from "react-hook-form";

// 텍스트필드 스타일 지정
const CustomTextField = styled(TextField)(({ theme }) => ({
    // 입력 커서 색
    '& .MuiInputBase-input': {
        color: theme.palette.text.secondary,
    },
    // 입력 글씨
    '& .MuiInputLabel-root': {
        color: theme.palette.text.secondary,
    },
    // 입력할 때 올라가는 라벨 색
    '& .MuiInputLabel-root.Mui-focused': {
        color: theme.palette.text.primary,
    },
    // 입력 칸
    '& .MuiOutlinedInput-root': {
        backgroundColor: theme.palette.secondary.main,
        opacity: 1,
        // 기본
        '& fieldset': {
            borderColor: theme.palette.border.primary,
            borderWidth: '0.2px',
        },
        // 커서 올릴 때(변화 없는 거 맞음)
        '&:hover fieldset': {
            borderColor: theme.palette.border.primary,
            borderWidth: '0.2px',
        },
        // 클릭
        '&.Mui-focused fieldset': {
            borderColor: theme.palette.border.secondary,
            borderWidth: '2px',
        },
    },
}));

// 답변 박스 스타일 지정
const AnswerBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.text.secondary,
    border: `0.2px solid ${theme.palette.border.primary}`,
    borderRadius: '4px',
    padding: '16px',
    marginBottom: '16px',
    '&:hover': {
        borderColor: theme.palette.border.primary,
    },
    '&.Mui-focused': {
        borderColor: theme.palette.border.secondary,
        borderWidth: '2px',
    },
}));

/**
 * 1. FunctionName: ReplyInquiryAlert
 * 2. FileName : ReplyInquiryAlert.js
 * 3. Package  : components.ReplyInquiryAlert
 * 4. Comment  : 어드민 문의 답변 폼
 * 5. 작성자   : mijin
 * 6. 작성일   : 2024. 07. 23
 **/
const ReplyInquiryAlert = ({ open, handleClose, question, onSubmit }) => {
    const { register, handleSubmit, formState: { errors }, reset  } = useForm();

    // 답변 내용을 저장하는 상태 변수
    const [answer, setAnswer] = useState('');
    const theme = useTheme();

    // 모달이 열리거나 질문이 변경될 때 답변 내용을 초기화하는 효과
    useEffect(() => {
        if (open && question) {
            setAnswer('');
        }
    }, [open, question]);

    // 폼이 제출될 때 호출되는 함수 
    const handleFormSubmit = (data) => {
        console.log('Submitted answer:', data.answer); // 콘솔 로그 추가
        onSubmit(data); // onSubmit을 호출하여 부모 컴포넌트에서 처리
        handleClose();
        reset(); // 폼 초기화
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitle>{question?.question_title}</DialogTitle>
            <Divider style={{ background: theme.palette.divider }} />
            <DialogContent>
                <div style={{ margin: "10px" }}>
                    <Typography variant="body1" gutterBottom>문의 내용: {question?.question}</Typography>
                    <Typography variant="body1" gutterBottom>문의 날짜: {question?.question_date}</Typography>
                    <Typography variant="body1" gutterBottom>작성자: {question?.name}</Typography>
                </div>
                {question?.answer ? (
                    <>
                        <Typography variant="body1" gutterBottom>답변 내용: </Typography>
                        <AnswerBox>
                            {question.answer}
                        </AnswerBox>
                    </>
                ) : (
                    <form onSubmit={handleSubmit(handleFormSubmit)}>
                        <CustomTextField
                            autoFocus
                            margin="dense"
                            placeholder="답변 내용을 입력해주세요"
                            type="text"
                            fullWidth
                            variant="outlined"
                            rows={8}
                            multiline
                            {...register("answer", { required: "답변 내용을 입력해주세요." })}
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            error={!!errors.answer}
                            helperText={errors.answer ? errors.answer.message : ''}
                        />
                        <DialogActions style={{ marginRight: "20px", marginBottom: "20px" }}>
                            <Button variant="contained" onClick={handleClose} color="primary">취소</Button>
                            <Button variant="contained" type="submit" color="primary">제출</Button>
                        </DialogActions>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default ReplyInquiryAlert;
