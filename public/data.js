undiscussed_topics = [];
undiscussed_topic1 = {};
undiscussed_topic1.name = 'Introduction';
undiscussed_topic1.description = 'ProjectX';
undiscussed_topic2 = {};
undiscussed_topic2.name = 'Related work';
undiscussed_topic2.description = 'ProjectX';
undiscussed_topic3 = {};
undiscussed_topic3.name = 'Analysis';
undiscussed_topic3.description = 'ProjectX';
undiscussed_topic4 = {};
undiscussed_topic4.name = 'Prediction';
undiscussed_topic4.description = 'ProjectX';
undiscussed_topic5 = {};
undiscussed_topic5.name = 'Results';
undiscussed_topic5.description = 'ProjectX';
undiscussed_topics.push(undiscussed_topic1);
undiscussed_topics.push(undiscussed_topic2);
undiscussed_topics.push(undiscussed_topic3);
undiscussed_topics.push(undiscussed_topic4);
undiscussed_topics.push(undiscussed_topic5);

discussed_topics = [];

meeting = {};
meeting.start_time = new Date(2017, 12, 01, 0, 0, 0, 0);
meeting.end_time = new Date(2017, 12, 01, 1, 0, 0, 0);
//meeting.end_time.setHours(meeting.start_time.getHours() + 1);