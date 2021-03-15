/* tslint:disable */
import { FlowTypes } from "src/app/shared/model/flowTypes";

export const template: FlowTypes.Template[] = [
  {
    "flow_type": "template",
    "flow_name": "widget_video",
    "status": "released",
    "rows": [
      {
        "type": "display_group",
        "rows": [
          {
            "type": "title",
            "name": "title",
            "value": "Video",
            "comments": "For consistency with the other widgets, it would make sense if the title and help fit inside the widget frame."
          },
          {
            "name": "help",
            "type": "set_variable"
          }
        ]
      },
      {
        "type": "video",
        "name": "video_src",
        "comments": "Needs option for full screen mode"
      }
    ]
  },
  {
    "flow_type": "template",
    "flow_name": "widget_slider",
    "status": "released",
    "rows": [
      {
        "name": "min_value",
        "value": 1,
        "type": "set_variable"
      },
      {
        "name": "max_value",
        "value": 10,
        "type": "set_variable"
      },
      {
        "name": "step",
        "value": 1,
        "type": "set_variable"
      },
      {
        "name": "min_text",
        "value": "Low",
        "type": "set_variable"
      },
      {
        "name": "max_text",
        "value": "High",
        "type": "set_variable"
      },
      {
        "name": "unit_text",
        "value": "units",
        "type": "set_variable"
      },
      {
        "name": "default_value",
        "value": "null",
        "type": "set_variable"
      },
      {
        "name": "_value",
        "value": "@local.default_value",
        "comments": "should be type: set_default",
        "type": "set_variable"
      },
      {
        "type": "display_group",
        "rows": [
          {
            "type": "title",
            "name": "title"
          },
          {
            "name": "help",
            "comments": "should be type: help",
            "type": "set_variable"
          }
        ]
      },
      {
        "type": "display_group",
        "rows": [
          {
            "type": "slider",
            "name": "slider",
            "action_list": [
              {
                "action_id": "set_value",
                "args": []
              }
            ],
            "parameter_list": [
              "min_value:@local.min_value",
              "min_text:@local.min_text",
              "max_value:@max_value",
              "max_text:@local.max_text",
              "step:@local.step",
              "unit_text:@local.unit_text"
            ]
          },
          {
            "comments": "no_answer",
            "type": "set_variable"
          }
        ]
      }
    ]
  },
  {
    "flow_type": "template",
    "flow_name": "workshop_activity",
    "status": "released",
    "rows": [
      {
        "name": "activity_image_src",
        "value": "src/assets/not-found-image.png",
        "comments": "A workshop activity corresponds to a column in Figma. It typically consists of intro and content. It occasionally has an outro.",
        "type": "set_variable"
      },
      {
        "name": "activity_title",
        "value": "Title of this activity",
        "type": "set_variable"
      },
      {
        "name": "include_outro",
        "value": "false",
        "type": "set_variable"
      },
      {
        "name": "hide_intro",
        "value": "false",
        "type": "set_variable"
      },
      {
        "name": "hide_content",
        "value": "true",
        "type": "set_variable"
      },
      {
        "name": "hide_outro",
        "value": "true",
        "type": "set_variable"
      },
      {
        "type": "display_theme",
        "name": "display_theme",
        "value": "passive_theme"
      },
      {
        "type": "animated_section",
        "name": "intro",
        "value": "fade_in_out",
        "hidden": "@local.hide_intro",
        "rows": [
          {
            "type": "image",
            "name": "intro_image_src",
            "value": "@local.activity_image",
            "parameter_list": [
              "background_box"
            ]
          },
          {
            "type": "title",
            "name": "intro_title",
            "value": "@local.activity_title"
          },
          {
            "type": "text",
            "name": "intro_text"
          },
          {
            "type": "template",
            "name": "intro_nav_buttons",
            "value": "nav_buttons",
            "action_list": [
              {
                "action_id": "completed",
                "args": [
                  "set_local:hide_content:false"
                ]
              },
              {
                "action_id": "completed",
                "args": [
                  "set_local:hide_intro:true"
                ]
              },
              {
                "action_id": "uncompleted",
                "args": [
                  "emit:uncompleted"
                ]
              }
            ],
            "rows": [
              {
                "name": "button_uncompleted",
                "value": "Skip",
                "hidden": "!@local._completed",
                "comments": "default: set_properties\nuse extend_properties to add to an existing list of properties",
                "type": "set_variable"
              }
            ]
          }
        ]
      },
      {
        "type": "animated_section",
        "name": "content",
        "hidden": "@local.hide_content",
        "rows": [
          {
            "type": "display_group",
            "name": "activity_banner",
            "hidden": "true",
            "rows": [
              {
                "type": "title",
                "name": "banner_title",
                "value": "@local.activity_title"
              },
              {
                "type": "image",
                "name": "banner_image_src",
                "value": "@local.activity_image",
                "parameter_list": [
                  "background_box"
                ]
              }
            ]
          },
          {
            "type": "template",
            "name": "content_box",
            "action_list": [
              {
                "action_id": "completed",
                "args": [
                  "set_local:hide_content:true"
                ]
              },
              {
                "action_id": "completed",
                "args": [
                  "set_local:hide_outro:false"
                ]
              },
              {
                "action_id": "uncompleted",
                "args": [
                  "set_local:hide_intro:false"
                ]
              },
              {
                "action_id": "uncompleted",
                "args": [
                  "set_local:hide_content:true"
                ]
              }
            ],
            "hidden": "!@local.include_outro",
            "comments": "Do this row when include_outro = TRUE",
            "rows": []
          },
          {
            "type": "template",
            "name": "content_box",
            "action_list": [
              {
                "action_id": "completed",
                "args": [
                  "emit:completed"
                ]
              },
              {
                "action_id": "uncompleted",
                "args": [
                  "set_local:hide_intro:false"
                ]
              },
              {
                "action_id": "uncompleted",
                "args": [
                  "set_local:hide_content:true"
                ]
              }
            ],
            "hidden": "@local.include_outro",
            "comments": "Do this row when include_outro = FALSE",
            "rows": []
          }
        ]
      },
      {
        "type": "animated_section",
        "name": "outro",
        "hidden": "@local.hide_outro",
        "rows": [
          {
            "type": "image",
            "name": "outro_image_src",
            "value": "@local.activity_image",
            "parameter_list": [
              "background_box"
            ]
          },
          {
            "type": "title",
            "name": "outro_title",
            "value": "@local.activity_title"
          },
          {
            "type": "text",
            "name": "outro_text"
          },
          {
            "type": "text",
            "name": "outro_habit_text",
            "parameter_list": [
              "alert"
            ]
          },
          {
            "type": "template",
            "name": "outro_nav_buttons",
            "value": "nav_buttons",
            "rows": []
          }
        ]
      }
    ]
  },
  {
    "flow_type": "template",
    "flow_name": "nav_buttons",
    "status": "released",
    "rows": [
      {
        "type": "display_group",
        "rows": [
          {
            "type": "button",
            "name": "button_info",
            "value": "Describe",
            "hidden": "true",
            "parameter_list": [
              "colour | secondary"
            ]
          },
          {
            "type": "button",
            "name": "button_completed",
            "value": "Next",
            "action_list": [
              {
                "action_id": "click",
                "args": [
                  "emit:completed"
                ]
              }
            ]
          },
          {
            "type": "button",
            "name": "button_uncompleted",
            "value": "Back",
            "action_list": [
              {
                "action_id": "click",
                "args": [
                  "emit:uncompleted"
                ]
              }
            ],
            "hidden": "true"
          }
        ]
      }
    ]
  },
  {
    "flow_type": "template",
    "flow_name": "video_component",
    "status": "released",
    "rows": [
      {
        "name": "video_src",
        "type": "set_variable"
      },
      {
        "name": "video_title",
        "value": "Video",
        "type": "set_variable"
      },
      {
        "name": "video_help",
        "type": "set_variable"
      },
      {
        "type": "template",
        "name": "widget_video",
        "value": "widget_video",
        "rows": [
          {
            "name": "video_src",
            "value": "@local.video_src",
            "type": "set_variable"
          },
          {
            "name": "title",
            "value": "@local.video_title",
            "type": "set_variable"
          },
          {
            "name": "help",
            "value": "@local.video_help",
            "type": "set_variable"
          }
        ]
      },
      {
        "type": "template",
        "name": "nav_buttons",
        "value": "nav_buttons",
        "rows": []
      }
    ]
  },
  {
    "flow_type": "template",
    "flow_name": "watch",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "workshop_activity",
        "value": "workshop_activity",
        "rows": [
          {
            "name": "activity_image",
            "value": "plh_images/characters/guide2/happy.svg",
            "__EMPTY": "placeholder",
            "type": "set_variable"
          },
          {
            "name": "activity_title",
            "value": "Watch",
            "hidden": "@fields.do_workshops_together",
            "__EMPTY": "placeholder",
            "type": "set_variable"
          },
          {
            "name": "intro_text",
            "value": "Let's watch a video!",
            "hidden": "@fields.do_workshops_together",
            "__EMPTY": "placeholder",
            "type": "set_variable"
          },
          {
            "name": "activity_title",
            "value": "Watch Together",
            "hidden": "!@fields.do_workshops_together",
            "__EMPTY": "placeholder",
            "type": "set_variable"
          },
          {
            "name": "intro_text",
            "value": "Let's watch a video together!",
            "hidden": "!@fields.do_workshops_together",
            "__EMPTY": "placeholder",
            "type": "set_variable"
          },
          {
            "type": "nested_properties",
            "name": "intro_nav_buttons",
            "rows": [
              {
                "name": "button_completed",
                "value": "Show video",
                "__EMPTY": "placeholder",
                "type": "set_variable"
              }
            ]
          },
          {
            "type": "nested_properties",
            "name": "content_box",
            "value": "video_component",
            "rows": [
              {
                "name": "video_help",
                "type": "set_variable"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "flow_type": "template",
    "flow_name": "welcome_together",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "watch",
        "value": "watch",
        "rows": [
          {
            "type": "nested_properties",
            "name": "workshop_activity",
            "rows": [
              {
                "name": "activity_title",
                "value": "Welcome @fields.group_name",
                "type": "set_variable"
              },
              {
                "name": "activity_image",
                "value": "plh_images/characters/guide2/happy.svg",
                "comments": "placeholder",
                "type": "set_variable"
              },
              {
                "type": "nested_properties",
                "name": "intro_nav_buttons",
                "rows": [
                  {
                    "name": "button_skipped",
                    "hidden": "false",
                    "type": "set_variable"
                  },
                  {
                    "name": "button_completed",
                    "value": "Start song",
                    "type": "set_variable"
                  }
                ]
              },
              {
                "type": "nested_properties",
                "name": "content_box",
                "rows": [
                  {
                    "name": "video_title",
                    "value": "Let's Slow Down",
                    "type": "set_variable"
                  },
                  {
                    "name": "video_src",
                    "value": "path to let's slow down video",
                    "type": "set_variable"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "flow_type": "template",
    "flow_name": "w_example_stepper",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "workshop_stepper",
        "value": "workshop_stepper",
        "hidden": "true",
        "rows": [
          {
            "type": "nav_group",
            "hidden": "!@fields.do_workshops_together",
            "parameter_list": [
              "show_stepper:true"
            ],
            "rows": [
              {
                "type": "template",
                "value": "w_example_welcome_together",
                "rows": [],
                "name": "w_example_welcome_together"
              },
              {
                "type": "template",
                "value": "w_example_read",
                "parameter_list": [
                  "theme:active"
                ],
                "rows": [],
                "name": "w_example_read"
              },
              {
                "type": "template",
                "value": "w_example_talk_together",
                "parameter_list": [
                  "theme:active"
                ],
                "rows": [],
                "name": "w_example_talk_together"
              },
              {
                "type": "template",
                "value": "w_example_tools_activity",
                "parameter_list": [
                  "theme:active"
                ],
                "rows": [],
                "name": "w_example_tools_activity"
              },
              {
                "type": "template",
                "value": "w_example_ending",
                "rows": [],
                "name": "w_example_ending"
              }
            ]
          }
        ]
      },
      {
        "type": "nav_group",
        "value": "w_example_welcome_individual",
        "parameter_list": [
          "show_stepper:true"
        ],
        "rows": []
      },
      {
        "type": "template",
        "value": "w_example_read",
        "parameter_list": [
          "theme:active"
        ],
        "rows": [],
        "name": "w_example_read"
      },
      {
        "type": "template",
        "value": "w_example_question_time",
        "parameter_list": [
          "theme:active"
        ],
        "rows": [],
        "name": "w_example_question_time"
      },
      {
        "type": "template",
        "value": "w_example_tools_activity",
        "parameter_list": [
          "theme:active"
        ],
        "rows": [],
        "name": "w_example_tools_activity"
      },
      {
        "type": "template",
        "value": "w_example_ending",
        "rows": [],
        "name": "w_example_ending"
      }
    ]
  },
  {
    "flow_type": "template",
    "flow_name": "w_example_welcome_together",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "welcome_together",
        "value": "welcome_together",
        "rows": [
          {
            "type": "nested_properties",
            "name": "watch",
            "rows": [
              {
                "type": "nested_properties",
                "name": "workshop_activity",
                "rows": [
                  {
                    "name": "intro_text",
                    "value": "This is the introduction text of the welcome together.",
                    "type": "set_variable"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "flow_type": "template",
    "flow_name": "w_example_read",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "read",
        "value": "read",
        "rows": [
          {
            "name": "number_of_slides",
            "value": 3,
            "type": "set_variable"
          },
          {
            "name": "slide_image_src_1",
            "value": "plh_images/modules/mod_instruct/thought_experiment/te_1.svg",
            "type": "set_variable"
          },
          {
            "name": "slide_text_1",
            "value": "This is the text on the first slide.",
            "type": "set_variable"
          },
          {
            "name": "slide_image_src_2",
            "value": "plh_images/modules/mod_instruct/thought_experiment/te_2.svg",
            "type": "set_variable"
          },
          {
            "name": "slide_text_2",
            "value": "This is the text on the second slide.",
            "type": "set_variable"
          },
          {
            "name": "slide_image_src_3",
            "value": "plh_images/modules/mod_instruct/thought_experiment/te_3.svg",
            "type": "set_variable"
          },
          {
            "name": "slide_text_3",
            "value": "This is the text on the third slide.",
            "type": "set_variable"
          }
        ]
      }
    ]
  },
  {
    "flow_type": "template",
    "flow_name": "w_example_talk_together",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "talk_together",
        "value": "talk_together",
        "rows": [
          {
            "name": "discussion_text",
            "value": "This text describes what should be discussed.",
            "type": "set_variable"
          }
        ]
      }
    ]
  },
  {
    "flow_type": "template",
    "flow_name": "w_example_question_time",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "value": "question_time",
        "rows": [
          {
            "name": "text_1",
            "value": "This is some text.",
            "type": "set_variable"
          },
          {
            "name": "question_text_1",
            "value": "This is the first question.",
            "type": "set_variable"
          },
          {
            "name": "answer_list_1",
            "value": "First combo box answer; Second combo box answer",
            "type": "set_variable"
          },
          {
            "name": "user_input_1",
            "value": "false",
            "type": "set_variable"
          },
          {
            "name": "reply_1",
            "value": "This text shows up when you've selected an answer.",
            "type": "set_variable"
          },
          {
            "name": "text_2",
            "value": "This is some text.",
            "type": "set_variable"
          },
          {
            "name": "question_text_2",
            "value": "This is the second question.",
            "type": "set_variable"
          },
          {
            "name": "answer_list_2",
            "value": "name:answer_1 | text: First answer; name:answer_2 | text:Second answer",
            "type": "set_variable"
          },
          {
            "name": "user_input_2",
            "value": "true",
            "type": "set_variable"
          },
          {
            "name": "reply_2",
            "value": "This text shows up when you've selected or typed an answer.",
            "type": "set_variable"
          }
        ],
        "name": "question_time"
      }
    ]
  },
  {
    "flow_type": "template",
    "flow_name": "w_example_tools",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "tools_component",
        "value": "tools_component",
        "rows": [
          {
            "type": "title",
            "name": "tools_title",
            "value": "Example Workshop"
          },
          {
            "type": "nested_properties",
            "name": "tool_1",
            "rows": [
              {
                "name": "title",
                "value": "First tool",
                "type": "set_variable"
              },
              {
                "name": "text_1",
                "value": "Text describing the first tool.",
                "type": "set_variable"
              },
              {
                "name": "button",
                "value": "Button",
                "hidden": "false",
                "type": "set_variable"
              }
            ]
          },
          {
            "type": "nested_properties",
            "name": "tool_2",
            "rows": [
              {
                "name": "title",
                "value": "Second tool",
                "type": "set_variable"
              },
              {
                "name": "subtitle_1",
                "value": "Subtitle 1",
                "hidden": "false",
                "type": "set_variable"
              },
              {
                "name": "text_1",
                "value": "Some text.",
                "type": "set_variable"
              },
              {
                "name": "subtitle_2",
                "value": "Subtitle 2",
                "hidden": "false",
                "type": "set_variable"
              },
              {
                "name": "text_2",
                "value": "More text.",
                "hidden": "false",
                "type": "set_variable"
              }
            ]
          },
          {
            "type": "nested_properties",
            "name": "tool_3",
            "rows": [
              {
                "name": "title",
                "value": "Third tool",
                "type": "set_variable"
              },
              {
                "name": "text_1",
                "value": "Text describing the third tool.",
                "type": "set_variable"
              },
              {
                "name": "image",
                "value": "plh_images/modules/mod_instruct/thought_experiment/te_1.svg",
                "hidden": "false",
                "type": "set_variable"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "flow_type": "template",
    "flow_name": "w_example_tools_activity",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "tools_activity",
        "value": "tools_activity",
        "rows": [
          {
            "type": "nested_properties",
            "name": "workshop_activity",
            "rows": [
              {
                "type": "nested_properties",
                "name": "content_box",
                "value": "w_example_tools_activity",
                "rows": []
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "flow_type": "template",
    "flow_name": "w_example_ending",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "ending",
        "value": "ending",
        "rows": []
      }
    ]
  },
  {
    "flow_type": "template",
    "flow_name": "slider_new",
    "status": "released",
    "rows": [
      {
        "type": "slider_new",
        "name": "template_slider",
        "value":  null,
        "parameter_list": [
          "title: Slider first",
          "min: 0",
          "max: 15",
          "min_value_label: not confident",
          "max_value_label: extremely confident",
          "help: some help info",
          "step: 3"
        ],
        "comments": ""
      },
      {
        "type": "slider_new",
        "name": "template_slider",
        "value":  null,
        "parameter_list": [
          "title: Slider second",
          "min: 0",
          "max: 30",
          "min_value_label: not confident",
          "max_value_label: extremely confident",
          "help: some help info",
          "step: 1"
        ],
        "comments": ""
      },
      {
        "type": "slider_new",
        "name": "template_slider",
        "value":  null,
        "parameter_list": [
          "title: Slider third",
          "min: 0",
          "max: 44",
          "min_value_label: not confident",
          "max_value_label: extremely confident",
          "help: some help info",
          "step: 2"
        ],
        "comments": ""
      },
      {
        "type": "slider_new",
        "name": "template_slider",
        "value":  null,
        "parameter_list": [
          "title: Slider fourth",
          "min: 0",
          "max: 100",
          "min_value_label: not confident",
          "max_value_label: extremely confident",
          "help: some help info",
          "step: 10"
        ],
        "comments": ""
      },
      {
        "type": "slider_new",
        "name": "template_slider",
        "value":  null,
        "parameter_list": [
          "title: Slider fifth",
          "min: 0",
          "max: 51",
          "min_value_label: not confident",
          "max_value_label: extremely confident",
          "help: some help info",
          "step: 3"
        ],
        "comments": ""
      },
      {
        "type": "slider_new",
        "name": "template_slider",
        "value":  null,
        "parameter_list": [
          "title: Slider fifth",
          "min: 0",
          "max: 60",
          "min_value_label: not confident",
          "max_value_label: extremely confident",
          "help: some help info",
          "step: 5"
        ],
        "comments": ""
      }
    ]
  },
  {
    "flow_type": "template",
    "flow_name": "slider",
    "status": "released",
    "rows": [
      {
        "type": "slider",
        "name": "template_slider",
        "parameter_list": [
          "title: Slider example",
          "min: 0",
          "max: 48",
          "min_value_label: not confident",
          "max_value_label: extremely confident",
          "help: some help info",
          "step: 2"
        ],
        "comments": ""
      }
    ]
  }

];
