import React, {useEffect, useState} from 'react';
import ReactMarkdown from "react-markdown";
import gfm from 'remark-gfm'
import {darcula, vscDarkPlus} from 'react-syntax-highlighter/dist/esm/styles/prism';
import {
    Box,
    Button,
    Grid
} from "@mui/material";
import {useNavigate, useSearchParams} from "react-router-dom";
import Global from "../../GlobalParams";

const them = {
    dark: vscDarkPlus,
    light: darcula
}

function CenteredMdReader() {

    const [search, setSearch] = useSearchParams();

    const [textContent, setContent] = useState("")

    const [darkMode, setDarkMode] = useState(false)

    async function init() {
        const url = Global.baseUrl
            + "/article/download/"
            + search.get("fileLink");
        fetch(url)
            .then(res => res.text())
            .then(text => setContent(text));

    }

    useEffect(() => {
        init();
    }, [])

    // String文本 boolean
    them.light = darcula;

    const navigate = useNavigate();

    return (
        <Box
            sx={{
                width: 1160,
                height: window.innerHeight,
                backgroundColor: '#ffffff',
                opacity: 0.85,
                borderRadius: 5,
            }}
        >
            <Box>
                <Button
                    variant={"outlined"}
                    onClick={() => {
                        navigate(-1);
                    }}
                    sx={{
                        width: 140,
                        margin: 2,
                        fontWeight: "bold",
                    }}
                >返回上一级</Button>
            </Box>
            {Global.isDesktop ?
                <Grid container>
                    <Grid xs={2}>
                    </Grid>
                    <Grid xs={8}>
                        <ReactMarkdown
                            remarkPlugins={[gfm]}
                        >
                            {textContent}
                        </ReactMarkdown>
                    </Grid>
                    <Grid xs={2}>

                    </Grid>
                </Grid>
                :
                <ReactMarkdown>
                    {textContent}
                </ReactMarkdown>
            }
        </Box>
    );
}

export default CenteredMdReader;
