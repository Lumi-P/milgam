import React, { memo } from "react";
import ReactPlayer from 'react-player/lazy';
import { useTheme } from '@mui/material/styles';

import { Card, CardContent, CardMedia, Typography } from '@mui/material';


const contStyle = (theme) => ({
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: theme.palette.background.default,
});

const cardStyle = (theme) => ({
    marginBottom: '20px',
    border: `1px solid ${theme.palette.border.primary}`,
});

/**
 * 1. ClassName: VideoCard
 * 2. FileName : VideoCard.js
 * 3. Package  : components.UploadVideo
 * 4. Comment  : 영상 재생 카드 화면
 * 5. 작성자   : boreum
 * 6. 작성일   : 2024. 07. 03
 **/
const VideoCard = memo(({ video, playerRef }) => {
    const theme = useTheme();

    return (
        <Card style={cardStyle(theme)}>
            <CardContent style={contStyle(theme)}>
                {/* 파일명 */}
                <Typography variant="h5" component="div">
                    {video.name}
                </Typography>
            </CardContent>
            {/* 영상 출력 */}
            <CardMedia >
                <ReactPlayer
                    className='react-player'
                    ref={playerRef} //시간 이동을 위해 필요
                    url={URL.createObjectURL(video)}
                    width='100%'
                    playing={true} //자동재생
                    muted={true} //음소거
                    controls={true} //컨트롤러
                    light={false} //컬러모드
                    style={{backgroundColor:"black"}}
                />
            </CardMedia>
        </Card>
    );
});

export default VideoCard;