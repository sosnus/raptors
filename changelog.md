# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)

## [Unreleased]

## [1.11.5a] - 2020-09-29
### Changed
- Fix task creator

## [1.11.4a] - 2020-09-21
### Added
- endpoint with current map information
- map changing functionality in settings
### Changed
- fixed wrong coordinates calculation on map
- use map parameters from new endpoint instead of storage service

## [1.11.3] - 2020-09-11
### Changed
- add minio and fasterxml as dependencies in pom.xml

## [1.11.2] - 2020-09-11
### Added
- merge status robota
- environments files (variables)
### Changed
- change version frontend and backend to  1.11.2
### Deploy changes
- change back addr to helike

## [1.10.3] - 2020-07-08
### Added
- Docker run script files
### Changed
- all addr change to localhost (without MongoDb on Tebe)

## [1.10.3] - 2020-07-08
### Changed
- Documentation: info about stacks, users, technologies, etc.
- Up version to 1.10.3

## [1.10.1] - 2020-07-01
### Added
- merge ra-barrier
### Deploy changes
- change ra-barrier in ra-front (barrierURL) 

## [1.9.5] - 2020-07-01
### Added
- Update docs, add info about Azure pipelines
- Scroll on main angular components
- Add addr to backend in healthz
### Deploy changes
- Prepare new Azure pipeline (for ra-docs)

## [1.9.0] - 2020-07-01
### Changed
- Enable quiet mvn build
### Added
- Pipeline badges add to Readme.md
### Deploy changes
- addr to new HELIKE standard

## [1.8.5] - 2020-07-01
### Changed
- Dockerfile (front - rm node_env param)
### Fixed
- bug in sidebar (InstanceInfo engine log error)
### Deploy changes
- Disable github action

## [1.8.2] - 2020-06-30
### Added
- Merge task-creator-feature
### Deploy changes
- database change to tebe

## [1.7.1] - 2020-06-17
### Added
- Dockerfile (front, back)
### Changed
- disable access to pom.xml from healthz
- some angular packages (downgrade and upgrade)
- npm babel package added

## [1.5.0] - 2020-05-26
### Added
- create documentation /docs
### Changed
- extend budget "anyComponentStyle" from 10kB to 100kB

## [1.0.4] - 2020-05-26
### Changed
- refactoring raptorsRobotsApp to ra-back
- refactoring angularclinet to ra-front

## [1.0.3] - 2020-05-25
### Added
- settings endpoint
- frontend settings view


## [1.0.2] - 2020-05-06
### Changed
- add scroll to sidebar
- edit robot view in sidebar
- add badge to tasks with status
- refactor status field in RobotTask

## [1.0.1] - 2020-04-16
### Added
- Changelog file added
- add healthz/backend
- add healthz/frontend
### Changed
- refactor domain/type/RobotStatus.java to domain.robots
- change version frontend and backend to  1.0.1


## [1.0.0] - 2020-02-19
### Added
- RaptorsApp project



-----------------------------------------------------------
- Added for new features.
- Changed for changes in existing functionality.
- Deprecated for soon-to-be removed features.
- Removed for now removed features.
- Fixed for any bug fixes.
- Security in case of vulnerabilities.
