use react200;
CREATE TABLE `react_user` (
`username` varchar(100) DEFAULT NULL COMMENT '사용자 이름',
`userorg` varchar(100) DEFAULT NULL COMMENT '소속기관',
`useremail` varchar(100) COMMENT '이메일',
`userpassword` varchar(100) DEFAULT NULL COMMENT '로그인 비밀번호',
`usermajor` varchar(100) DEFAULT NULL COMMENT '전공',
`userphone` varchar(100) DEFAULT NULL COMMENT '휴대전화번호',
`userflag` varchar(100) DEFAULT NULL COMMENT '승인여부',
`reg_date` varchar(100) DEFAULT NULL COMMENT '등록날짜',
`reg_user` varchar(100) DEFAULT NULL COMMENT '등록자',
`update_date` varchar(100) DEFAULT NULL COMMENT '수정날짜',
`update_user` varchar(100) DEFAULT NULL COMMENT '수정자',
PRIMARY KEY (`useremail`)
);
ALTER TABLE react_user convert to charset utf8;

use react200;
CREATE TABLE `react_batch_log` (
`batch_cd` varchar(100) COMMENT '배치 코드',
`batch_nm` varchar(100) DEFAULT NULL COMMENT '배치명',
`batch_log` varchar(100) DEFAULT NULL COMMENT '배치내용',
`reg_date` varchar(100) DEFAULT NULL COMMENT '등록날짜',
PRIMARY KEY (`batch_cd`)
);
ALTER TABLE react_batch_log convert to charset utf8;

use react200;
CREATE TABLE `react_swtool` (
`swt_code` varchar(100) NOT NULL COMMENT 'SW툴 코드',
`swt_toolname` varchar(100) DEFAULT NULL COMMENT '툴 이름',
`swt_function` text COMMENT '상세 기능',
`swt_imagepath` varchar(100) DEFAULT NULL COMMENT '라벨 이미지 경로',
`swt_big_imgpath` varchar(100) DEFAULT NULL COMMENT '메인 이미지 경로',
`swt_comments` text COMMENT '설명',
`swt_demo_site` varchar(100) DEFAULT NULL COMMENT '데모 URL',
`swt_manual_path` varchar(100) DEFAULT NULL COMMENT '메뉴얼 파일 경로',
`swt_github_url` varchar(100) DEFAULT NULL COMMENT 'Github URL',
`reg_date` varchar(100) DEFAULT NULL COMMENT ' 등록날짜',
`reg_user` varchar(100) DEFAULT NULL COMMENT ' 등록자',
`update_date` varchar(100) DEFAULT NULL COMMENT ' 수정날짜',
`update_user` varchar(100) DEFAULT NULL COMMENT ' 수정자',
PRIMARY KEY (`swt_code`)
);
