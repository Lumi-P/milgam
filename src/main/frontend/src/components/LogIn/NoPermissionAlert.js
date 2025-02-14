import * as React from 'react';

import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';


// 타이틀 스타일 정의
const cTitleStyle = (theme) => ({
    color: theme.palette.text.primary,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    margin: "5px",
    fontSize: "15px"
});
// 내용 정렬
const actionStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: 'absolute',
    right: 0,
}
// 글씨 스타일 정의
const cTextStyle = (theme) => ({
    color: theme.palette.text.primary,
    textAlign: "center",
    fontSize: "14px"
});

/**
 * 1. ClassName: NoPermissionAlert
 * 2. FileName : NoPermissionAlert.js
 * 3. Package  : components.Login
 * 4. Comment  : 미승인으로 로그인 실패 알림 창
 * 5. 작성자   : boreum
 * 6. 작성일   : 2024. 06. 27
 **/
// 관리자 승인 전일 때 띄움
const NoPermissionAlert = ({ alertOpen, handleClose }) => {
    const theme = useTheme();
    const titleStyle = cTitleStyle(theme);
    const textStyle = cTextStyle(theme);

    return (
        <Dialog
            open={alertOpen}
            onClose={handleClose}
            PaperProps={{
                style: { background: theme.palette.background.paper, width: "350px",}
            }}
        >
            <DialogTitle id="alert-dialog-title" style={titleStyle}>
                {"알림"}
                <DialogActions style={actionStyle}>
                    {/* 부모에 있는 함수 실행하여 닫음 */}
                    <IconButton onClick={handleClose} style={{color: theme.palette.text.primary}}>
                        <CloseIcon/>
                    </IconButton>
                </DialogActions>
            </DialogTitle>
            <Divider style={{background: theme.palette.divider, marginLeft: '40px', marginRight: '40px',}} />
            <DialogContent style={{margin: "20px", marginBottom: "30px",}}>
                <DialogContentText id="alert-dialog-slide-description" style={textStyle} >
                    관리자 승인 전입니다.
                </DialogContentText>
                <DialogContentText
                    id="alert-dialog-slide-description"
                    style={{color: theme.palette.text.secondary, textAlign: "center", fontSize: "12px", marginTop: "10px"}}
                >
                    추후 다시 시도해주세요.
                </DialogContentText>
            </DialogContent>
        </Dialog>
    );
}

export default NoPermissionAlert;