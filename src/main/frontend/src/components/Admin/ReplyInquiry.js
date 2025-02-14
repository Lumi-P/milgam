import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, styled, TablePagination  } from '@mui/material';
import ReplyInquiryAlert from './ReplyInquiryAlert';
import { useTheme } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import axiosRetry from 'axios-retry';
import { CustomTableRow, CustomTableCell, tableHeaderStyle  } from '../Styles/CustomTable'

// TableContainer 스타일
const CustomTableContainer = styled(TableContainer)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    borderRadius: '12px',
  }));  

const progressStyle = {
  margin: "20px",
  justifyContent: "center",
  display: 'flex',
};

// axios 인스턴스 생성 및 retry 설정
const axiosInstance = axios.create();
axiosRetry(axiosInstance, { retries: 5, retryDelay: axiosRetry.exponentialDelay });

// 날짜 형식을 yyyy-mm-dd로 변환하는 함수
const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

/**
 * 1. FunctionName: ReplyInquiry
 * 2. FileName : ReplyInquiry.js
 * 3. Package  : components.ReplyInquiry
 * 4. Comment  : 어드민 문의 답변 
 * 5. 작성자   : mijin
 * 6. 작성일   : 2024. 07. 23
 **/
const ReplyInquiry = () => {
    // 상태관리 변수들
    const theme = useTheme();
    const [questions, setQuestions] = useState();
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)

    /**
     * 1. MethodName: fetchQuestions
     * 2. ClassName : fetchQuestions
     * 3. Comment   : 어드민 답변 통신
     * 4. 작성자    : mijin
     * 5. 작성일    : 2024. 07. 21
     **/
    const fetchQuestions = async () => {
        try {
          setLoading(true); // 데이터 로딩 시작
          const response = await axiosInstance.get('/admin/questionlist'); // axios 인스턴스 사용
          console.log('Questions 데이터:', response.data); // 데이터 확인을 위한 로그
          const sortedData = response.data.sort((a, b) => new Date(b.question_date) - new Date(a.question_date));
          setQuestions(sortedData);
        } catch (error) {
          console.error('Questions 데이터를 가져오는 중 오류 발생:', error);
          setError('데이터를 가져오는 중 오류가 발생했습니다. ');
        } finally {
          setLoading(false); // 데이터 로딩 종료
        }
      };

    // 페이지네이션
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    // 처음 렌더링될 때 실행
    useEffect(() => {
        fetchQuestions();
    }, []);

    // 모달 여는 함수
    const openModal = (question) => {
        setSelectedQuestion(question);
        setIsModalOpen(true);
    };

    // 모달 닫는 함수
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedQuestion(null);
    };

    /**
     * 1. MethodName: handleAnswerSubmit
     * 2. ClassName : handleAnswerSubmit
     * 3. Comment   : 어드민 제출 통신
     * 4. 작성자    : mijin
     * 5. 작성일    : 2024. 07. 21
     **/
    const handleAnswerSubmit = async (data) => {
        const answerData = {
            myq_index: selectedQuestion.myq_index, 
            answer: data.answer,
        };

        try {
            const response = await axios.post(`/admin/answer`, answerData);
            console.log('Answer submitted successfully:', response.data); // POST 요청 성공 여부 확인
            closeModal();
            fetchQuestions(); // 질문 목록을 다시 불러와 업데이트 상태 반영
            alert('답변을 보냈습니다.');
        } catch (error) {
            console.error('답변 제출 중 오류가 발생했습니다!', error);
            alert('오류가 발생하여 답변을 제출하지 못했습니다.');
        }
    };

    return (
        <div>
            <CustomTableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={tableHeaderStyle(theme)}>번호</TableCell>
                            <TableCell sx={tableHeaderStyle(theme)}>제목</TableCell>
                            <TableCell sx={tableHeaderStyle(theme)}>작성자</TableCell>
                            <TableCell sx={tableHeaderStyle(theme)}>상태</TableCell>
                            <TableCell sx={tableHeaderStyle(theme)}>문의 날짜</TableCell>
                            <TableCell sx={tableHeaderStyle(theme)}>답변 날짜</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {questions && questions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((question, index) => (
                            <CustomTableRow key={question.myq_index} onClick={() => openModal(question)}>
                                <CustomTableCell>{index + 1}</CustomTableCell>
                                <CustomTableCell>{question.question_title}</CustomTableCell>
                                <CustomTableCell>{question.name}</CustomTableCell>
                                <CustomTableCell>{question.answer_date ? '완료' : '대기'}</CustomTableCell>
                                <CustomTableCell>{formatDate(question.question_date)}</CustomTableCell>
                                <CustomTableCell>{formatDate(question.answer_date) || '-'}</CustomTableCell>
                            </CustomTableRow >
                        ))}
                    </TableBody>
                </Table>
                {/* 로딩 중일 때 표시 */}
                {loading &&
                <div style={progressStyle}>
                    <CircularProgress sx={{ color: theme.palette.primary.main }} />
                </div>
                }
                {!loading && !questions && (
                <div style={{ textAlign: 'center', margin: '10px', color: theme.palette.text.secondary }}>{error}목록이 없습니다.</div>
                )}
                {questions && <TablePagination
                component="div"
                count={questions.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 15, 20]} // 페이지 네이션 옵션
                sx={{ mt: 'auto' }} // 페이지네이션을 하단에 고정
                />}
            </CustomTableContainer>
            <ReplyInquiryAlert
                open={isModalOpen}
                handleClose={closeModal}
                question={selectedQuestion}
                onSubmit={handleAnswerSubmit}
            />
        </div>
    );
};

export default ReplyInquiry;
