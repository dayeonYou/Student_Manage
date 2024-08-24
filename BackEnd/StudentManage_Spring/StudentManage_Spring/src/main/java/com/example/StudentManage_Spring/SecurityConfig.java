package com.example.StudentManage_Spring;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(requests ->
                        requests
                                .requestMatchers("/**").permitAll()       // 경로는 모두에게 허용
                                .anyRequest().authenticated()           // 그 외 경로는 인증 필요
                )
                .formLogin(form ->
                        form
                                .loginPage("/login").permitAll()        // 커스텀 로그인 페이지 설정
                )
                .logout(logout ->
                        logout
                                .logoutUrl("/logout")                   // 로그아웃 URL 설정
                                .logoutSuccessUrl("/")                  // 로그아웃 후 리다이렉트 URL 설정
                                .invalidateHttpSession(true)            // 세션 무효화
                                .deleteCookies("JSESSIONID")            // 쿠키 삭제
                                .permitAll()                            // 로그아웃 경로는 모두에게 허용
                )
                .csrf(csrf ->
                        csrf.disable()                               // CSRF 보호 비활성화 (테스트용)
                );

        return http.build();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        UserDetails user =
                User.builder()
                        .username("user")
                        .password(passwordEncoder().encode("p@ssw0rd"))  // 비밀번호 암호화
                        .roles("USER")
                        .build();
        return new InMemoryUserDetailsManager(user);  // 메모리 내 사용자 정보 관리
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();  // 비밀번호 암호화 방식 설정
    }
}
