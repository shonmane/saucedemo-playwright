pipeline {
    // Custom pre-built image with Chromium + OS deps already baked in
    // (see Dockerfile) — avoids re-downloading ~150MB+ on every build.
    agent {
        docker {
            image 'saucedemo-ci:1.62.1-all-browsers'
            args '-u root:root'
        }
    }

    options {
        timestamps()
        // Keep the last 10 builds' artifacts/history around.
        buildDiscarder(logRotator(numToKeepStr: '10'))
        // Fail fast if a run hangs.
        timeout(time: 45, unit: 'MINUTES')
    }

    environment {
        CI = 'true'
    }

    stages {
        stage('Install dependencies') {
            steps {
                // Chromium is already baked into the image — this now
                // only installs npm packages, which is fast.
                sh 'npm ci'
            }
        }

        stage('Run Playwright tests') {
            steps {
                // Non-zero exit code from failed tests shouldn't kill the
                // whole pipeline before we've had a chance to publish
                // reports, so capture status and act on it after.
                sh 'npx playwright test || true'
            }
        }

        stage('Publish results') {
            steps {
                junit 'test-results/junit.xml'

                publishHTML(target: [
                    reportName : 'Playwright HTML Report',
                    reportDir  : 'playwright-report',
                    reportFiles: 'index.html',
                    keepAll    : true,
                    alwaysLinkToLastBuild: true,
                    allowMissing: false
                ])

                archiveArtifacts artifacts: 'test-results/**', allowEmptyArchive: true
            }
        }

        stage('Evaluate test result') {
            steps {
                script {
                    def testResults = junit testResults: 'test-results/junit.xml'
                    if (testResults.failCount > 0) {
                        error("${testResults.failCount} test(s) failed.")
                    }
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        failure {
            echo 'Build failed — check the JUnit results and HTML report above.'
        }
    }
}