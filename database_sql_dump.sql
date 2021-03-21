create table answers
(
    answer_id int auto_increment
        primary key,
    correct   tinyint(1) default 0 null,
    text      varchar(1000)        not null
);

create table questions
(
    question_id int auto_increment
        primary key,
    text        varchar(1000) not null
);

create table question_answer
(
    question_id int null,
    answer_id   int null,
    constraint question_answer_answer_id_fk
        foreign key (answer_id) references answers (answer_id)
            on update cascade on delete cascade,
    constraint question_answer_question_id_fk
        foreign key (question_id) references questions (question_id)
            on update cascade on delete cascade
);

create table quizs
(
    quiz_id     int auto_increment
        primary key,
    quiz_number int null
);

create table quiz_question
(
    quiz_id     int null,
    question_id int null,
    constraint quiz_question_question_id_fk
        foreign key (question_id) references questions (question_id)
            on update cascade on delete cascade,
    constraint quiz_question_quiz_id_fk
        foreign key (quiz_id) references quizs (quiz_id)
            on update cascade on delete cascade
);

create table score_board
(
    id        int auto_increment
        primary key,
    quiz_id   int           null,
    user_name varchar(256)  null,
    score     int default 0 null,
    constraint score_board_quiz_id_fk
        foreign key (quiz_id) references quizs (quiz_id)
);

