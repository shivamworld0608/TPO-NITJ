import { useState, useEffect, useRef, useMemo } from 'react'
import { FaArrowLeft } from "react-icons/fa";;
import { CKEditor, useCKEditorCloud } from '@ckeditor/ckeditor5-react';
import axios from 'axios';
import toast from 'react-hot-toast';

import '../../App.css';

const LICENSE_KEY = 'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3Mzc1OTAzOTksImp0aSI6Ijk5MjY4NWNkLTA2ZGItNDkyMy1iZDZkLTEyZjQ3YjI3MjEyYiIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6ImJiZjVjM2RiIn0.Ic-PhYPV8pkHd9XJRnfEpMT8k0M2PeS2oJ1kTIv0qULSCpWgXgUJI4U3zc5hiAQHB2bUm0P6v3r0xWX0lbhC5Q';

export default function Editor({experience,onClose}) {
    const editorContainerRef = useRef(null);
    const editorRef = useRef(null);
    const editorWordCountRef = useRef(null);
    const editorMenuBarRef = useRef(null);
    const [editorInstance, setEditorInstance] = useState(null);
    const [isLayoutReady, setIsLayoutReady] = useState(false);
    const cloud = useCKEditorCloud({ version: '44.1.0' });
    const [editorData, setEditorData] = useState(experience);

    useEffect(() => {
        setIsLayoutReady(true);
        return () => setIsLayoutReady(false);
    }, []);

    const { ClassicEditor, editorConfig } = useMemo(() => {
        if (cloud.status !== 'success' || !isLayoutReady) {
            return {};
        }

        const {
            ClassicEditor,
            Alignment,
            Autoformat,
            AutoImage,
            Autosave,
            BalloonToolbar,
            BlockQuote,
            Bold,
            CloudServices,
            Essentials,
            FontBackgroundColor,
            FontColor,
            FontFamily,
            FontSize,
            GeneralHtmlSupport,
            Heading,
            Highlight,
            HorizontalLine,
            ImageBlock,
            ImageCaption,
            ImageInline,
            ImageInsertViaUrl,
            ImageResize,
            ImageStyle,
            ImageTextAlternative,
            ImageToolbar,
            ImageUpload,
            Indent,
            IndentBlock,
            Italic,
            Link,
            LinkImage,
            List,
            ListProperties,
            MediaEmbed,
            Paragraph,
            PasteFromOffice,
            SpecialCharacters,
            SpecialCharactersArrows,
            SpecialCharactersCurrency,
            SpecialCharactersEssentials,
            SpecialCharactersLatin,
            SpecialCharactersMathematical,
            SpecialCharactersText,
            Strikethrough,
            Style,
            Subscript,
            Superscript,
            Table,
            TableCaption,
            TableCellProperties,
            TableColumnResize,
            TableProperties,
            TableToolbar,
            TextPartLanguage,
            TextTransformation,
            Title,
            TodoList,
            Underline,
            WordCount
        } = cloud.CKEditor;

        return {
            ClassicEditor,
            editorConfig: {
                toolbar: {
                    items: [
                        'textPartLanguage',
                        '|',
                        'heading',
                        'style',
                        '|',
                        'fontSize',
                        'fontFamily',
                        'fontColor',
                        'fontBackgroundColor',
                        '|',
                        'bold',
                        'italic',
                        'underline',
                        'strikethrough',
                        'subscript',
                        'superscript',
                        '|',
                        'specialCharacters',
                        'horizontalLine',
                        'link',
                        'insertImageViaUrl',
                        'mediaEmbed',
                        'insertTable',
                        'highlight',
                        'blockQuote',
                        '|',
                        'alignment',
                        '|',
                        'bulletedList',
                        'numberedList',
                        'todoList',
                        'outdent',
                        'indent'
                    ],
                    shouldNotGroupWhenFull: true
                },
                plugins: [
                    Alignment,
                    Autoformat,
                    AutoImage,
                    Autosave,
                    BalloonToolbar,
                    BlockQuote,
                    Bold,
                    CloudServices,
                    Essentials,
                    FontBackgroundColor,
                    FontColor,
                    FontFamily,
                    FontSize,
                    GeneralHtmlSupport,
                    Heading,
                    Highlight,
                    HorizontalLine,
                    ImageBlock,
                    ImageCaption,
                    ImageInline,
                    ImageInsertViaUrl,
                    ImageResize,
                    ImageStyle,
                    ImageTextAlternative,
                    ImageToolbar,
                    ImageUpload,
                    Indent,
                    IndentBlock,
                    Italic,
                    Link,
                    LinkImage,
                    List,
                    ListProperties,
                    MediaEmbed,
                    Paragraph,
                    PasteFromOffice,
                    SpecialCharacters,
                    SpecialCharactersArrows,
                    SpecialCharactersCurrency,
                    SpecialCharactersEssentials,
                    SpecialCharactersLatin,
                    SpecialCharactersMathematical,
                    SpecialCharactersText,
                    Strikethrough,
                    Style,
                    Subscript,
                    Superscript,
                    Table,
                    TableCaption,
                    TableCellProperties,
                    TableColumnResize,
                    TableProperties,
                    TableToolbar,
                    TextPartLanguage,
                    TextTransformation,
                    Title,
                    TodoList,
                    Underline,
                    WordCount
                ],
                balloonToolbar: ['bold', 'italic', '|', 'link', '|', 'bulletedList', 'numberedList'],
                fontFamily: {
                    supportAllValues: true
                },
                fontSize: {
                    options: [10, 12, 14, 'default', 18, 20, 22],
                    supportAllValues: true
                },
                heading: {
                    options: [
                        {
                            model: 'paragraph',
                            title: 'Paragraph',
                            class: 'ck-heading_paragraph'
                        },
                        {
                            model: 'heading1',
                            view: 'h1',
                            title: 'Heading 1',
                            class: 'ck-heading_heading1'
                        },
                        {
                            model: 'heading2',
                            view: 'h2',
                            title: 'Heading 2',
                            class: 'ck-heading_heading2'
                        },
                        {
                            model: 'heading3',
                            view: 'h3',
                            title: 'Heading 3',
                            class: 'ck-heading_heading3'
                        },
                        {
                            model: 'heading4',
                            view: 'h4',
                            title: 'Heading 4',
                            class: 'ck-heading_heading4'
                        },
                        {
                            model: 'heading5',
                            view: 'h5',
                            title: 'Heading 5',
                            class: 'ck-heading_heading5'
                        },
                        {
                            model: 'heading6',
                            view: 'h6',
                            title: 'Heading 6',
                            class: 'ck-heading_heading6'
                        }
                    ]
                },
                htmlSupport: {
                    allow: [
                        {
                            name: /^.*$/,
                            styles: true,
                            attributes: true,
                            classes: true
                        }
                    ]
                },
                image: {
                    toolbar: [
                        'toggleImageCaption',
                        'imageTextAlternative',
                        '|',
                        'imageStyle:inline',
                        'imageStyle:wrapText',
                        'imageStyle:breakText',
                        '|',
                        'resizeImage'
                    ]
                },
                initialData: editorData ? `<h1>${editorData.title}</h1>${editorData.content}` : '<h2>Write Title Here..</h2>',
                licenseKey: LICENSE_KEY,
                link: {
                    addTargetToExternalLinks: true,
                    defaultProtocol: 'https://',
                    decorators: {
                        toggleDownloadable: {
                            mode: 'manual',
                            label: 'Downloadable',
                            attributes: {
                                download: 'file'
                            }
                        }
                    }
                },
                list: {
                    properties: {
                        styles: true,
                        startIndex: true,
                        reversed: true
                    }
                },
                menuBar: {
                    isVisible: true
                },
                placeholder: 'Type or paste your content here!',
                style: {
                    definitions: [
                        {
                            name: 'Article category',
                            element: 'h3',
                            classes: ['category']
                        },
                        {
                            name: 'Title',
                            element: 'h2',
                            classes: ['document-title']
                        },
                        {
                            name: 'Subtitle',
                            element: 'h3',
                            classes: ['document-subtitle']
                        },
                        {
                            name: 'Info box',
                            element: 'p',
                            classes: ['info-box']
                        },
                        {
                            name: 'Side quote',
                            element: 'blockquote',
                            classes: ['side-quote']
                        },
                        {
                            name: 'Marker',
                            element: 'span',
                            classes: ['marker']
                        },
                        {
                            name: 'Spoiler',
                            element: 'span',
                            classes: ['spoiler']
                        },
                        {
                            name: 'Code (dark)',
                            element: 'pre',
                            classes: ['fancy-code', 'fancy-code-dark']
                        },
                        {
                            name: 'Code (bright)',
                            element: 'pre',
                            classes: ['fancy-code', 'fancy-code-bright']
                        }
                    ]
                },
                table: {
                    contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
                }
            }
        };
    }, [cloud, isLayoutReady]);

    const submitExperience = async (tempcontent) => {
        try {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = tempcontent;
            const titleElement = tempDiv.querySelector('h1');
            const title = titleElement ? titleElement.textContent : 'Untitled';
            if (titleElement) {
                titleElement.remove();
            }
            const content = tempDiv.innerHTML;

            const endpoint = editorData
                ? `${import.meta.env.REACT_APP_BASE_URL}/sharedexperience/${editorData?._id}`
                : `${import.meta.env.REACT_APP_BASE_URL}/sharedexperience/submit`;

            const response = await axios.post(
                endpoint,
                { title, content },
                { withCredentials: true }
            );
            onClose();
            toast.success(editorData ? 'Experience updated successfully!' : 'Experience submitted successfully!');
        } catch (error) {
            console.error('Error:', error);
            toast.error('Something went wrong!');
        }
    };

    const handleSave = () => {
        if (editorInstance) {
            const content = editorInstance.getData();
            submitExperience(content);
        } else {
            console.error('Editor instance not available');
        }
    };

    return (
        <div className="main-container">
             <button
          onClick={onClose}
          className="flex items-center space-x-2 text-custom-blue hover:text-blue-700 mb-4"
        >
          <FaArrowLeft />
        </button>
            <div
                className="editor-container editor-container_classic-editor editor-container_include-style editor-container_include-word-count"
                ref={editorContainerRef}
            >
                <div className="editor-container__editor">
                    <div ref={editorRef}>
                        {ClassicEditor && editorConfig && (
                            <CKEditor
                                onReady={editor => {
                                    setEditorInstance(editor);
                                    const wordCount = editor.plugins.get('WordCount');
                                    editorWordCountRef.current.appendChild(wordCount.wordCountContainer);
                                    editorMenuBarRef.current.appendChild(editor.ui.view.menuBarView.element);
                                }}
                                onAfterDestroy={() => {
                                    setEditorInstance(null);
                                    Array.from(editorWordCountRef.current?.children || []).forEach(child => child.remove());
                                    Array.from(editorMenuBarRef.current?.children || []).forEach(child => child.remove());
                                }}
                                editor={ClassicEditor}
                                config={editorConfig}
                            />
                        )}
                    </div>
                </div>
                <div className="editor-container__word-count" ref={editorWordCountRef}></div>
                <div className="editor-container__menu-bar" ref={editorMenuBarRef}></div>
            </div>
            <button onClick={handleSave} className="bg-custom-blue text-white px-4 py-2 rounded">
                {editorData ? 'Update' : 'Save'}
            </button>
        </div>
    );
}