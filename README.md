# Project DP

## To Do list / Brainstorming

1. Layout with custom templates
2. highlight days (holidays)
3. select a week
4. range selection mode
5. Limited date range (min, max)

6. time select

## In Development

1. animations ✔

## Bugs

1. clear icon doesn't work ✔
2. picker doesn't update when selecting a date from prev or next month (datemode.service line 27 currentMonth invalid array length)
2-1. is random. main problem the currentMonth is being created (new Array) with negative(-) value
