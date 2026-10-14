@echo off
chcp 65001 >nul
title 九域热点 - 停止
cd /d F:\INDUSTRYHOT.Site
set DOCKER="C:\Program Files\Docker\Docker\resources\bin\docker.exe"

echo ============================================
echo   九域热点  停止器
echo ============================================
echo.
echo 正在关闭容器（数据已保留在本地卷）...
%DOCKER% compose down
echo.
echo 已停止。下次双击「启动九域热点.bat」即可重新启动。
echo.
pause
